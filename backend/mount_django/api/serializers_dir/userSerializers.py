from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ["role","id","username","phone","password","password2"]
        extra_kwargs = {"password": {"write_only":True},"id":{"read_only":True},"role":{'required':False}}

    def validate(self,attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return attrs

    def create(self,validated_data):
        validated_data.pop('password2')
        user = User(
            role = validated_data.get("role"),
            username = validated_data.get('username'),
            phone = validated_data.get("phone","")

        )
    
        user.set_password(validated_data['password'])
        user.save()
        return user