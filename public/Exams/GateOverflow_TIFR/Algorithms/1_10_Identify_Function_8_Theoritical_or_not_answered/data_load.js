window.__examLoadCallback({
  "title": "Algorithms - Identify Function - Theoretical/Not Answered",
  "duration": 3,
  "sections": [
    {
      "name": "Identify Function",
      "questions": [
        {
          "id": 6,
          "question": "<p><a name=\"95299\"></a><div itemprop=\"text\"><p>Consider the following program modifying an \\( n \\times n \\) square matrix \\( A \\):</p>\n\n<pre class=\"prettyprint lang-c_cpp\">for i=1 to n:\n    for j=1 to n:\n        temp=A[i][j]+10\n        A[i][j]=A[j][i]\n        A[j][i]=temp-10\n    end for\nend for</pre>\n\n<p>Which of the following statements about the contents of matrix \\( A \\) at the end of this program must be TRUE?</p>\n\n</div><br><br><b>TIFR CSE 2017 | Part A | Question: 12</b></p>",
          "type": "single",
          "options": [
            "<p>the new \\( A \\) is the transpose of the old \\( A \\)</p>",
            "<p>all elements above the diagonal have their values increased by \\( 10 \\) and all the values below have their values decreased by \\( 10 \\)</p>",
            "<p>all elements above the diagonal have their values decreased by \\( 10 \\) and all the values below have their values increased by \\( 10 \\)</p>",
            "<p>the new matrix \\( A \\) is symmetric, that is, \\( A[i][j]=A[j][i] \\) for all \\( 1 \\leq i, j \\leq n \\)</p>",
            "<p>\\( A \\) remains unchanged</p>"
          ],
          "correct_answer": "E",
          "marks": 1,
          "negative_marks": 0,
          "explanation": "<p><a href=\"https://gateoverflow.in/95299/tifr-cse-2017-part-a-question-12\" target=\"_blank\">https://gateoverflow.in/95299/tifr-cse-2017-part-a-question-12</a></p>"
        }
      ]
    }
  ]
});
