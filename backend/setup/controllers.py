from flask import jsonify, Response, session
from .models import db, User, Playlist, Music
from dotenv import load_dotenv
from datetime import datetime, timedelta
import jwt
import os

load_dotenv()

class UserAuth:
    @staticmethod
    def register_user(data):
        try:
            # Check if fields are empty
            if not data.get('username') or not data.get('password'):
                return jsonify({"message": 'Username and Password must be provided.'}), 400
            
            username = data['username']
            password = data['password']
            
            # Check if username already exists
            existing_user = User.query.filter_by(username=username).first()
        
            if existing_user:
                return jsonify({'message': 'Username already exists!'}), 400

            # Hash Password
            hashed_password = User.generate_hash(password)

            # Add new User
            new_user = User(username=username, password=hashed_password)
            db.session.add(new_user)
            db.session.commit()

            return jsonify({'message': 'New user registered!'}), 201
        except Exception as e:
            return jsonify({'message': f'Error registering user: {str(e)}'}), 400

    @staticmethod
    def login_user(data):
        try:
            # Check if fields are empty
            if not data.get('username') or not data.get('password'):
                return jsonify({'message': 'Username and password must be provided!'}), 400
            
            username = data['username']
            password = data['password']
            
            # Find user in the database
            found_user = User.query.filter_by(username=username).first()
        
            if not found_user or not User.verify_hash(password, found_user.password):
                return jsonify({'message': 'Invalid Username or Password!'}), 400
            
            # Generate token upon successful login
            token = UserAuth.create_token(found_user)
            return UserAuth.set_cookie(token)
            
        except Exception as e:
            return jsonify({'message': f'Error occurred with login: {str(e)}'}), 400

    @staticmethod
    def create_token(user):
        try:
            token = jwt.encode(payload={
                'user_id': user.id,
                'user_name': user.username,
                'exp': datetime.now() + timedelta(minutes=10)
            }, key=os.getenv('JWT_SECRET_KEY'), algorithm='HS256')
            return token
        except Exception as e:
            return jsonify({'message': f'Error with JWT token creation: {str(e)}'}), 400

    @staticmethod
    def set_cookie(token):
        try:
            # Construct the response data as a dictionary
            # response_data = {'status': True, 'msg': 'Login Successful'}   
            
            # session['x-auth-token'] = token
            
            return {'statusCode': 201, 'body': token}
        except Exception as e:
            # If an error occurs, return an error response
            error_response_data = {'status': False, 'msg': 'Error setting cookie', 'error': str(e)}
            return jsonify(error_response_data), 500

    @staticmethod
    def logout():
        try:
            # Clear the token stored in the session
            if 'x-auth-token' in session:
                del session['x-auth-token']
            
            return {'status': True, 'msg': 'Logout Successful'}
        except Exception as e:
            # If an error occurs, return an error response
            error_response_data = {'status': False, 'msg': 'Error with logout', 'error': str(e)}
            return error_response_data, 500