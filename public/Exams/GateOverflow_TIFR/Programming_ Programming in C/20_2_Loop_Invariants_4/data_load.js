window.__examLoadCallback({
  "title": "Programming_ Programming in C - Loop Invariants",
  "duration": 8,
  "sections": [
    {
      "name": "Loop Invariants",
      "questions": [
        {
          "id": 2,
          "question": "<p><a name=\"19251\"></a><div itemprop=\"text\"><p>Consider the program where \\( a, b \\) are integers with \\( b &gt; 0 \\).</p>\n\n<pre class=\"prettyprint lang-c_cpp\">x:=a; y:=b; z:=0;   \nwhile y &gt; 0 do\n    if odd (x) then\n        z:= z + x;\n        y:= y - 1;\n    else y:= y % 2;\n        x:= 2 * x;\n    fi</pre>\n\n<p>Invariant of the loop is a condition which is true before and after every iteration of the loop. In the above program the loop invariant is given by</p>\n\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \\( 0\\leq y \\) and \\( z + x * y= a * b \\)</p>\n\n<p>Which of the following is true of the program?</p>\n\n</div><br><br><b>TIFR CSE 2010 | Part B | Question: 37</b></p>",
          "type": "single",
          "options": [
            "<p>The program will not terminate for some values of \\( a, b \\).</p>",
            "<p>The program will terminate with \\( z=2^{b} \\)</p>",
            "<p>The program will terminate with \\( z = a * b \\).</p>",
            "<p>The program will not terminate for some values of \\( a, b \\) but when it does terminate, the condition \\( z = a * b \\) will hold.</p>",
            "<p>The program will terminate with \\( z=a^{b} \\)</p>"
          ],
          "correct_answer": "<p>The program will not terminate for some values of \\( a, b \\).</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/19251/tifr-cse-2010-part-b-question-37\" target=\"_blank\">https://gateoverflow.in/19251/tifr-cse-2010-part-b-question-37</a></p>"
        },
        {
          "id": 3,
          "question": "<p><a name=\"95683\"></a><div itemprop=\"text\"><p>Consider&nbsp;the following psuedocode fragment, where \\( y \\) is an integer that has been initialized.</p>\n\n<pre class=\"prettyprint lang-c_cpp\">int i=1\nint j=1\nwhile (i&lt;10):\n    j=j*i\n    i=i+1\n    if (i==y):\n        break\n    end if\nend while</pre>\n\n<p>Consider the following statements:</p>\n\n<ol style=\"list-style-type:lower-roman\">\n\t<li>\\( (i==10) \\) or \\( (i==y) \\)</li>\n\t<li>If \\( y &gt; 10 \\), then \\( i==10 \\)</li>\n\t<li>If \\( j=6 \\), then \\( y==4 \\)</li>\n</ol>\n\n<p>Which of the above statements&nbsp;is/are TRUE at the end of the while loop? Choose from the following options.</p>\n\n</div><br><br><b>TIFR CSE 2017 | Part B | Question: 5</b></p>",
          "type": "single",
          "options": [
            "<p>i only</p>",
            "<p>iii only</p>",
            "<p>ii and iii only</p>",
            "<p>i, ii, and iii</p>",
            "<p>None of the above</p>"
          ],
          "correct_answer": "<p>i, ii, and iii</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/95683/tifr-cse-2017-part-b-question-5\" target=\"_blank\">https://gateoverflow.in/95683/tifr-cse-2017-part-b-question-5</a></p>"
        },
        {
          "id": 4,
          "question": "<p><a name=\"280486\"></a><div itemprop=\"text\"><p>Consider the following program fragment:</p>\n\n<pre class=\"prettyprint linenums lang-text\" data-pbcklang=\"text\" data-pbcktabsize=\"4\">var x, y: integer;\nx := 1; y := 0;\nwhile y &lt; x do\nbegin\n   x := 2*x;\n   y := y+1\nend;\n</pre>\n\n<p>For the above fragment , which of the following is a loop invariant ?</p>\n\n\n\n\n</div><br><br><b>TIFR CSE 2019 | Part B | Question: 9</b></p>",
          "type": "single",
          "options": [
            "<p>\\( x=y+1 \\)</p>",
            "<p>\\( x=(y+1)^2 \\)</p>",
            "<p>\\( x=(y+1)2^y \\)</p>",
            "<p>\\( x=2^y \\)</p>",
            "<p>None of the above, since the loop does not terminate</p>"
          ],
          "correct_answer": "<p>\\( x=2^y \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/280486/tifr-cse-2019-part-b-question-9\" target=\"_blank\">https://gateoverflow.in/280486/tifr-cse-2019-part-b-question-9</a></p>"
        }
      ]
    }
  ]
});
