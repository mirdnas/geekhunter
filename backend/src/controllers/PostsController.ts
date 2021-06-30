import { Request, Response } from 'express';
import { Posts } from '../entity/Posts';
import { getRepository, Like } from 'typeorm';
import { Users } from '../entity/Users';


class PostController {

  async index( request : Request, response : Response ){
    const userId = request.userId
    const repository = getRepository(Posts);

    const allPosts = await repository.find({relations:['user']});
    return response.json( allPosts );
  }

  async search( request : Request, response : Response ){
    const repository = getRepository(Posts);
    const { q } = request.query;
    const pesquisa = '%'+q+'%';

    const allPosts = await repository.find({
      where: [
        { title: Like(pesquisa) },
        { content: Like(pesquisa) }
      ],
      relations:['user']
    });

    return response.json( allPosts );
  }

  async destroy ( request : Request, response : Response ) {

    const userIdbyToken = request.userId;
    const repository = getRepository(Posts);
    const { id } = request.params;

    const post = await repository.findOne({ where: { id: id }, relations:['user'] });


    if(!post){
      return response.status(404).json({message:'post não existe'})
    }

    if( post.user.id !== userIdbyToken ){
      return response.status(401).json({message:'Usuário não autorizado'})
    }

    await repository.remove(post);

    return response.status(204).send();

  }

  async show ( request : Request, response : Response ) {
    const repository = getRepository(Posts);

    // const userIdbyToken = request.userId;
    const { id } = request.params;

    const post = await repository.findOne({ where: { id: id }, relations:['user'] });

    if(!post){
      return response.status(404).json({message: 'Post não existe'});
    }
    return response.json( post );
  }

  async update( request : Request, response : Response ){

    const repository = getRepository(Posts);

    const { title, content  } = request.body;
    const userIdbyToken = request.userId;
    const { id } = request.params;



    if(!title){
      return response.status(400).json({message: 'title is required'});
    }

    if(!content){
      return response.status(400).json({message: 'content is required'});
    }

    const post = await repository.findOne({ where: { id: id }, relations:['user'] });

    if(!post){
      return response.status(404).json({message: 'Post não existe'});
    }

    if( post.user.id !== userIdbyToken ){
      return response.status(401).json({message:'Usuário não autorizado'})
    }

    post.title = title,
    post.content = content;
    await repository.save(post);

    const resposta = {
      title: post.title,
      content: post.content,
      userId: post.user.id
    }

    return response.json(resposta);
  }

  async store( request : Request, response : Response ){
    const repository = getRepository(Posts);

    const { title, content  } = request.body;
    const userIdbyToken = request.userId;

    if(!title){
      return response.status(400).json({message: 'title is required'});
    }

    if(!content){
      return response.status(400).json({message: 'content is required'});
    }

    const UserRepository = getRepository(Users);
    const user = await repository.findOne({ where: { id: userIdbyToken } } );

    const data = {
      title,
      content,
      user: userIdbyToken
    }

    const post =  await repository.create(data);

    await repository.save(post);

    const resposta = {
      title: post.title,
      content: post.content,
      userId: post.userId
    }

    return response.status(201).json(resposta);

  }

}

export default new PostController();
