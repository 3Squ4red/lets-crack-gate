window.__examLoadCallback({
  "title": "Compiler Design - Grammar - Theoretical/Not Answered",
  "duration": 44,
  "sections": [
    {
      "name": "Grammar",
      "questions": [
        {
          "id": 11,
          "question": "<p><a name=\"2597\"></a><div itemprop=\"text\"><p>Consider a grammar with the following productions</p>\n\n<ul>\n\t<li>\\( S &nbsp;\\rightarrow &nbsp;a \\alpha &nbsp;b \\mid b \\alpha &nbsp;c \\mid aB \\)</li>\n\t<li>\\( S &nbsp;\\rightarrow \\alpha &nbsp;S\\mid b \\)</li>\n\t<li>\\( S &nbsp;\\rightarrow \\alpha b b\\mid ab \\)</li>\n\t<li>\\( S &nbsp;\\alpha \\rightarrow bd b\\mid b \\)</li>\n</ul>\n\n<p>The above grammar is:</p>\n\n</div><br><br><b>GATE CSE 1995 | Question: 1.10</b></p>",
          "type": "single",
          "options": [
            "<p>Context free</p>",
            "<p>Regular</p>",
            "<p>Context sensitive</p>",
            "<p>\\( LR(k) \\)</p>"
          ],
          "correct_answer": "X",
          "marks": 1,
          "negative_marks": 0,
          "explanation": "<p><a href=\"https://gateoverflow.in/2597/gate-cse-1995-question-1-10\" target=\"_blank\">https://gateoverflow.in/2597/gate-cse-1995-question-1-10</a></p>"
        },
        {
          "id": 14,
          "question": "<p><a name=\"2739\"></a><div itemprop=\"text\"><p>The grammar whose productions are</p>\n\n<ul>\n<li>\\( \\langle\\text{stmt}\\rangle&nbsp;\\to\\text{&nbsp;if id then} \\langle\\text{stmt}\\rangle \\)</li>\n<li>\\( \\langle\\text{stmt}\\rangle\\to\\text{&nbsp;if id then} \\langle\\text{stmt}\\rangle\\text{else} \\langle\\text{stmt}\\rangle \\)</li>\n<li>\\( \\langle\\text{stmt}\\rangle \\to\\text{id}:=\\text{id} \\)</li>\n</ul>\n\n<p>is ambiguous because</p>\n\n<p>(a) the sentence</p>\n\n<pre class=\"prettyprint lang-c_cpp\" style=\"margin-left: 40px;\">if a then if b then c:= d</pre>\n\n<p>has more than two parse trees</p>\n\n<p>(b) the left most and right most derivations of the sentence</p>\n\n<pre class=\"prettyprint lang-c_cpp\" style=\"margin-left: 40px;\">if a then if b then c:= d</pre>\n\n<p>give rise to different parse trees</p>\n\n<p>(c) the sentence&nbsp;</p>\n\n<pre class=\"prettyprint lang-c_cpp\" style=\"margin-left: 40px;\">if a then if b then c:= d else c:= f</pre>\n\n<p>has more than two parse trees</p>\n\n<p>(d) the sentence</p>\n\n<pre class=\"prettyprint lang-c_cpp\" style=\"margin-left: 40px;\">if a then if b then c:= d else c:= f</pre>\n\n<p>has two parse trees</p></div><br><br><b>GATE CSE 1996 | Question: 2.10</b></p>",
          "type": "single",
          "options": [],
          "correct_answer": "<p>D</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/2739/gate-cse-1996-question-2-10\" target=\"_blank\">https://gateoverflow.in/2739/gate-cse-1996-question-2-10</a></p>"
        }
      ]
    }
  ]
});
