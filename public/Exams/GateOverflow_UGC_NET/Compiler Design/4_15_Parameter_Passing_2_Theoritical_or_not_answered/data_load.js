window.__examLoadCallback({
  "title": "Compiler Design - Parameter Passing - Theoretical/Not Answered",
  "duration": 3,
  "sections": [
    {
      "name": "Parameter Passing",
      "questions": [
        {
          "id": 1,
          "question": "<p><a name=\"70917\"></a><div itemprop=\"text\"><p>Assume that the program \\( ‘P’ \\) is implementing parameter passing with ‘call by reference’. What will be printed by following print statements in \\( P \\)?</p>\n\n<pre class=\"prettyprint linenums lang-c_cpp\" data-pbcklang=\"c_cpp\" data-pbcktabsize=\"4\">Program P\n{\n    x=10;\n    y=3;\n    funb(y,x,x)\n    print x;\n    print y;\n}\nfunb (x,y,z)\n{\n    y=y+4;\n    z=x+y+z;\n}</pre>\n\n</div><br><br><b>UGC NET CSE | August 2016 | Part 3 | Question: 21</b></p>",
          "type": "single",
          "options": [
            "<p>10, 7</p>",
            "<p>31, 3</p>",
            "<p>10, 3</p>",
            "<p>31, 7</p>"
          ],
          "correct_answer": "Q-Q",
          "marks": 1,
          "negative_marks": 0,
          "explanation": "<p><a href=\"https://gateoverflow.in/70917/ugc-net-cse-august-2016-part-3-question-21\" target=\"_blank\">https://gateoverflow.in/70917/ugc-net-cse-august-2016-part-3-question-21</a></p>"
        }
      ]
    }
  ]
});
