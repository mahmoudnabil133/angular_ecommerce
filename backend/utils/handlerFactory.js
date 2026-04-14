import mongoose from "mongoose";
class HandlerFactory{
    
    static getAll(Model){
        return async (req, res)=>{
            try{
                const docs = await Model.find();
                if(docs.length === 0) throw new Error('no documents found');
                return res.status(200).json({docs});
            }catch(err){
                return res.status(500).json({message: err.message});
            }
        }
    }
    
    static getById(Model){
        return async (req, res)=>{
            try{
                const {id} = req.params;
                if(!id) throw new Error('id not found');
                if(!mongoose.Types.ObjectId.isValid(id)){
                    throw new Error('id object not valid')
                }
    
                const doc = await Model.findById(id);
                if(!doc) throw new Error(`document not found`);
                res.status(200).json({doc});
            }catch(err){
                return res.status(400).json({message: err.message});
            }

        }
    }

    static updateOne(Model){
        return async(req, res)=>{
            try{
                const {id} = req.params;
                if(!id) throw new Error('id not found');
                if(!mongoose.Types.ObjectId.isValid(id)){
                    throw new Error('id object not valid')
                }
                let doc = req.body;
    
                doc = await Model.findByIdAndUpdate(id, doc, {new:true, runValidators: true});
                return res.status(200).json({doc});
                
                
            }catch(err){
                return res.status(500).json({err:err.message});
            }

        }
    }
    static createOne(Model){
        return async (req, res)=>{
            try{
                const doc = req.body;
                const result = await Model.create(doc);
                return res.status(201).json({result});            
                
            }catch(err){
                return  res.status(500).json({message:err.message});
            }
        }

    }

    static deleteOne(Model){
        return async (req, res)=>{
            try{
                const id = req.params.id;
                await Model.findByIdAndDelete(id);
                return res.status(200).json({message: 'Result deleted'});
            }catch(err){
                return res.status(400).json({message: 'Error in deleting user'});
            }
        }

    }
}

export default HandlerFactory;