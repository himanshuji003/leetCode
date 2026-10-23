


const createProblem = async (req,res)=>{
    try{
  
        const { title, description, 
            difficulty, tags,
             visibleTestCases,hiddenTestCases,
              startCode,problemCreator,
              referenceSolution } = req.body;

        for(const { language, completeCode }; of referenceSolution){
             
        }      
    }
    catch(err){

    }
}