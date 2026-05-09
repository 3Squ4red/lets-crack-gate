window.__examLoadCallback({
  "title": "Compiler Design - Parameter Passing - Theoretical/Not Answered",
  "duration": 19,
  "sections": [
    {
      "name": "Parameter Passing",
      "questions": [
        {
          "id": 11,
          "question": "<p><a name=\"43575\"></a><div itemprop=\"text\"><p>The following program fragment is written in a programming language that allows global variables and does not allow nested declarations of functions.</p>\n\n<pre class=\"prettyprint lang-c_cpp\">global int i=100, j=5;\nvoid P(x) {\n\tint i=10;\n    print(x+10);\n    i=200;\n    j=20;\n    print (x);\n}\nmain() {P(i+j);}\n</pre>\n\n<p>If the programming language uses dynamic scoping and call by name parameter passing mechanism, the values printed by the above program are</p>\n\n</div><br><br><b>GATE CSE 2003 | Question: 74</b></p>",
          "type": "single",
          "options": [
            "<p>\\( 115, 220 \\)</p>",
            "<p>\\( 25, 220 \\)</p>",
            "<p>\\( 25, 15 \\)</p>",
            "<p>\\( 115, 105 \\)</p>"
          ],
          "correct_answer": "X",
          "marks": 1,
          "negative_marks": 0,
          "explanation": "<p><a href=\"https://gateoverflow.in/43575/gate-cse-2003-question-74\" target=\"_blank\">https://gateoverflow.in/43575/gate-cse-2003-question-74</a></p>"
        }
      ]
    }
  ]
});
