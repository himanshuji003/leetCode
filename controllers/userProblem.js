const { getLanguageById, submitBatch,submitToken } = require("../utils/problemUtlity");
const Problem = require('../models/problem');

const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      visibleTestCases,
      hiddenTestCases,
      startCode,
      problemCreator,
      referenceSolution,
    } = req.body;

    for (const { language, completeCode } of referenceSolution) {
      const languageId = getLanguageById(language);
      
      // Batch Submission
      const submission = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));
      
      const submitResult = await submitBatch(submission);
      
      const resultToken = submitResult.map((value) => value.token);

      const testResult = await submitToken(resultToken);
      // console.log(testResult)
      for (const test of testResult) {
        // Implement logic for all using juddeg0 website
        if (test.status_id != 3) {
          return res.status(400).send("Error Occured");
        }
      }
    }

    const userProblem = await Problem.create({
        ...req.body,
        problemCreator:req.result._id,
    })

    res.status(201).send("Problem Saved Successfully");
  } catch (err) {
    res.status(400).send("Error: "+err);
  }
};

const updateProblem = async(req,res)=>{
    const {id} = req.params;
    const {
      title,
      description,
      difficulty,
      tags,
      visibleTestCases,
      hiddenTestCases,
      startCode,
      problemCreator,
      referenceSolution,
    } = req.body;
    try{
      if(!id){
        return res.status(400).send("Missing Id field");
      }
      const DsaProblem = await Problem.findById(id);

      if(!DsaProblem){
        return res.status(400).send("Wrong question Id");
      }

      for (const { language, completeCode } of referenceSolution) {
        const languageId = getLanguageById(language);

        // Batch Submission
        const submission = visibleTestCases.map((testcase) => ({
          source_code: completeCode,
          language_id: languageId,
          stdin: testcase.input,
          expected_output: testcase.output,
        }));

        const submitResult = await submitBatch(submission);

        const resultToken = submitResult.map((value) => value.token);

        const testResult = await submitToken(resultToken);

        for (const test of testResult) {
          // Implement logic for all using juddeg0 website
          if (test.status_id != 3) {
            return res.status(400).send("Error Occured");
          }
        }
      }

      const newProblem = await Problem.findByIdAndUpdate(id, {...req.body},{runValidators:true,new:true});
      res.status(200).send(newProblem);
    }
    catch(err){
      res.status(500).send("Error: "+err);
    }
};

const deleteProblem = async(req,res)=>{
  const {id} = req.params;
  try{
    if(!id){
      return res.send(400).send('Id is missing');
    }
    const DsaProblem = await Problem.findById(id);
    if(!DsaProblem){
      return res.send(400).send("Problem Not Exist");
    }
    const deletedProblem = await Problem.findByIdAndDelete(DsaProblem);
    if(!deletedProblem){
      return res.status(404).send('Problem is missing');
    }
    res.status(200).send("Problem Deleted successfully");

  }
  catch(err){
    res.status(500).send("Error: "+err);
  }
};

const getProblemById = async(req,res)=>{
  const {id} = req.params;
  try{
    if(!id){
      return res.status(400).send("Id is missing");
    }

    const getProblem = await Problem.findById(id).select(
      "title description difficulty tags visibleTestCases startCode referenceSolution",
    );

    if(!getProblem){
      return res.status(404).send("Problem is missing");
    }
    res.status(200).send(getProblem);
  }
  catch(err){
    res.status(500).send("Error: "+err);
  }
};

const getAllProblem = async (req, res) => {
  
  try {
    const getProblem = await Problem.find({}).select('_id title  difficulty tags');
    if (getProblem.length == 0) {
      return res.status(404).send("Problem is missing");
    }
    res.status(200).send(getProblem);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};

const solvedAllProblembyUser = async(req,res)=>{
    
};


module.exports = {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemById,
  getAllProblem,
  solvedAllProblembyUser,
};
