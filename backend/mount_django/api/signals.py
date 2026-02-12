# roles.py
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from .models import Customer, Expense, Product, ProductCategory
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Company, CompanyRole

ROLE_RULES = {
    "Partner": {
        Customer: ("add", "view", "change", "delete"),
        Expense: ("add", "view", "change", "delete"),
        Product: ("add", "view", "change", "delete"),
        ProductCategory: ("add", "view", "change", "delete"),
    },
    "Manager": {
        Customer: ("add", "view", "change"),
        Expense: ("add", "view", "change"),
        Product: ("add", "view", "change"),
        ProductCategory: ("add", "view", "change"),
    },
    "Accountant": {
        Customer: ("add", "view", "change", "delete"),
        Expense: ("add", "view", "change", "delete"),
        Product: ("add", "view", "change", "delete"),
        ProductCategory: ("add", "view", "change", "delete"),
    },
    "SalesPerson": {
        Customer: ("add", "view", "change"),
        Expense: ("add", "view"),
        Product: ("view",),
        ProductCategory: ("view",),
    },
    "StockManager": {
        Product: ("add", "view", "change"),
        ProductCategory: ("view",),
    },
    "Guest":{
        Customer: ("view"),
        Expense: ("view"),
        Product: ("view",),
        ProductCategory: ("view",),
    }
}



def perms_for_model(model, actions=("add", "view", "change", "delete")):
    content_type = ContentType.objects.get_for_model(model)
    codenames = [f"{action}_{model._meta.model_name}" for action in actions]
    return Permission.objects.filter(content_type=content_type, codename__in=codenames)


@receiver(post_save, sender=Company)
def create_roles_for_new_company(sender, instance, created, **kwargs):
    if not created:
        return

    for role_name, model_actions in ROLE_RULES.items():
        role, _ = CompanyRole.objects.get_or_create(
            company=instance,
            name=role_name
        )
        permissions = Permission.objects.none()
        for model, actions in model_actions.items():
            permissions |= perms_for_model(model, actions)

        role.permissions.set(permissions.distinct())
