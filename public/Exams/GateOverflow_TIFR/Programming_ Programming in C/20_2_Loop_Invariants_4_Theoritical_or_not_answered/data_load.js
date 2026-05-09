window.__examLoadCallback({
  "title": "Programming_ Programming in C - Loop Invariants - Theoretical/Not Answered",
  "duration": 3,
  "sections": [
    {
      "name": "Loop Invariants",
      "questions": [
        {
          "id": 1,
          "question": "<p><a name=\"19042\"></a><div itemprop=\"text\"><p>Consider the following program for summing the entries of the array \\( b \\): array \\( [0 .. N-1] \\) of integers, where \\( N \\) is a positive integer. (The symbol '\\( &lt;&gt; \\)' denotes 'not equal to').</p>\n\n<pre class=\"prettyprint lang-c_cpp\">var      \n    i, s: integer;\nProgram\n    i:= 0;\n    s:= 0;\n[*] while i &lt;&gt; N do\n        s := s + b[i];\n        i := i + 1;\n    od</pre>\n\n<p>Which of the following gives the invariant that holds at the beginning of each loop, that is, each time the program arrives at point \\( [*] \\) ?</p>\n\n\n\n</div><br><br><b>TIFR CSE 2010 | Part B | Question: 30</b></p>",
          "type": "single",
          "options": [
            "<p>\\( s = \\sum\\limits^{N}_{j=0}b[j] \\;\\&\\; 0 \\leq i \\leq N \\)</p>",
            "<p>\\( s = \\sum\\limits^{i=1}_{j=0}b[j] \\;\\&\\; 0 \\leq i &lt; N \\)</p>",
            "<p>\\( s = \\sum\\limits^{i}_{j=0}b[j] \\;\\&\\; 0 &lt; i \\leq N \\)</p>",
            "<p>\\( s = \\sum\\limits^{N}_{j=1}b[j] \\;\\&\\; 0 \\leq &nbsp;i &lt; N \\)</p>",
            "<p>\\( s = \\sum\\limits^{i-1}_{j=0}b[j] \\;\\&\\; 0 \\leq &nbsp;i \\leq N \\)</p>"
          ],
          "correct_answer": "E",
          "marks": 1,
          "negative_marks": 0,
          "explanation": "<p><a href=\"https://gateoverflow.in/19042/tifr-cse-2010-part-b-question-30\" target=\"_blank\">https://gateoverflow.in/19042/tifr-cse-2010-part-b-question-30</a></p>"
        }
      ]
    }
  ]
});
