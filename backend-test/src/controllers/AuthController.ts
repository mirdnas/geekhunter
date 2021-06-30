import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {

  async authenticate( request : Request, response : Response ){
    const repository = getRepository(Users);
    const { email, password } = request.body;

    if(typeof  request.body['email'] === 'undefined'){
      return response.status(400).json({message:'email is required'});
    }

    if(typeof  request.body['password'] === 'undefined'){
      return response.status(400).json({message:'password is required'});
    }

    if( email == ""){
      return response.status(400).json({message:'email is not allowed to be empty'});
    }

    if( password == ""){
      return response.status(400).json({message:'password is not allowed to be empty'});
    }

    const user = await repository.findOne({ select: ['id','email','password'],  where: {email} });

    if(!user){
      return response.status(400).json({message:'Campos inválidos'});
    }

    const isValidPassword = await bcrypt.compare(password,user.password);

    if(!isValidPassword){
      return response.status(400).json({message:'Campos inválidos'});
    }

    const token = jwt.sign( { id: user.id } , 'osegredo', { expiresIn: '1d' } );

    return response.json({
      token
    })

  }
}

export default new AuthController();
