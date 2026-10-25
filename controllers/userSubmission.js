const Problem = require("../models/problem")
const Submission = require('../models/submission');
const { getLanguageById, submitBatch } = require("../utils/problemUtlity");
const submitCode = async(req,res)=>{
    try{
        const userId = req.result._id;
        const problemId = req.params.id;
        
        const {code ,language} = req.body;

        if(!userId|| !problemId|| !code|| !language){
            return res.status(400).send("Some feild are missing");
        }

        // Fetch the problem from database
        const problem = await Problem.findById(problemId);

        // testCases(Hidden);

        // Submission before sending judeg0
        const submittedResult = await Submission.create({
          userId,
          problemId,
          language,
          code,
          testCasesPassed:0,
          status:'pending',
          testCasesTotal:problem.hiddenTestCases.length
        });

        // Submit the code to judge0
        const languageId = getLanguageById(language);

        const submission = problem.hiddenTestCases.map((testcase) => ({
          source_code: code,
          language_id: languageId,
          stdin: testcase.input,
          expected_output: testcase.output,
        }));

        const submitResult = await submitBatch(submission);

        const resultToken = submitResult.map((value) => value.token);

        const testResult = await submitToken(resultToken);

        let testCasesPassed = 0;
        let status = 'accepted';
        let errorMessage = null;
        // submittedResult ko update karna
        for(const test of testResult){
            if(test.status_id == 3){
                testCasesPassed++;
                runtime = runtime+parseFloat(test.time);
                memory = Math.max(memory,test.memory);
            }
            else{
                if(test.status_id == 4){
                    status = 'wrong'
                }
            }
        }
        
    }
    catch(err){

    }
}

module.exports = submitCode;
