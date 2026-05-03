from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)

    class Meta:
        model = UserProfile
        fields = ('user', 'first_name', 'last_name', 'role', 'bio')

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user
        
        # Update User fields
        if 'first_name' in user_data:
            user.first_name = user_data.get('first_name')
        if 'last_name' in user_data:
            user.last_name = user_data.get('last_name')
        user.save()
        
        # Update UserProfile fields
        instance.role = validated_data.get('role', instance.role)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()
        
        return instance
