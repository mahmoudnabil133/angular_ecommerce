import mongoose from "mongoose";
import User from '../models/user.model.js';
export class UserController{
    
    static async getAll(req, res) {
            try{
                const docs = await User.find();
                if(docs.length === 0) throw new Error('no documents found');
                return res.status(200).json({docs});
            }catch(err){
                return res.status(500).json({message: err.message});
            }
        }
    
    
    static async getById(req, res){
            try{
                const {id} = req.params;
                if(!id) throw new Error('id not found');
                if(!mongoose.Types.ObjectId.isValid(id)){
                    throw new Error('id object not valid')
                }
    
                const doc = await User.findById(id);
                if(!doc) throw new Error(`document not found`);
                res.status(200).json({doc});
            }catch(err){
                return res.status(400).json({message: err.message});
            }

    }

    static async updateOne(req, res){
            try{
                const {id} = req.params;
                if(!id) throw new Error('id not found');
                if(!mongoose.Types.ObjectId.isValid(id)){
                    throw new Error('id object not valid')
                }
                let doc = req.body;
    
                doc = await User.findByIdAndUpdate(id, doc, {new:true, runValidators: true});
                return res.status(200).json({doc});
                
                
            }catch(err){
                return res.status(500).json({err:err.message});
            }

        }
    
    static async createOne(req, res){
            try{
                const doc = req.body;
                const result = await User.create(doc);
                return res.status(201).json({result});            
                
            }catch(err){
                return  res.status(500).json({message:err.message});
            }
        }

    

    static async deleteOne(req, res){
            try{
                const id = req.params.id;
                await User.findByIdAndDelete(id);
                return res.status(200).json({message: 'Result deleted'});
            }catch(err){
                return res.status(400).json({message: 'Error in deleting user'});
            }
        }


}