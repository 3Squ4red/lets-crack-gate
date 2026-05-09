window.__examLoadCallback({
  "title": "Programming_ Programming in C - Loop Invariants",
  "duration": 11,
  "sections": [
    {
      "name": "Loop Invariants",
      "questions": [
        {
          "id": 5,
          "question": "<p><a name=\"1029\"></a><div itemprop=\"text\"><p>Consider the following program fragment for reversing the digits in a given integer to obtain a new integer.</p>\n\n<p>Let \\( n = d_1\\, d_2\\, \\ldots\\, d_m \\).</p>\n\n<pre class=\"prettyprint lang-c_cpp\">int n, rev;\nrev = 0;\nwhile(n &gt; 0) {\n    rev = rev * 10 + n%10;\n    n = n/10;\n}</pre>\n\n<p>The loop invariant condition at the end of the \\( i^{th} \\) iteration is:</p>\n\n</div><br><br><b>GATE CSE 2004 | Question: 32</b></p>",
          "type": "single",
          "options": [
            "<p>\\( n=d_1\\, d_2 \\,\\ldots\\, d_{m-i} \\qquad \\mathbf{and} \\qquad \\text{rev} = d_m\\,d_{m-1} \\,\\ldots\\, d_{m-i+1} \\)</p>",
            "<p>\\( n= d_{m-i+1} \\,\\ldots\\, d_{m-1}\\, d_m&nbsp;\\qquad \\mathbf{or} \\qquad&nbsp;\\text{rev} = d_{m-i} \\,\\ldots\\, d_2\\,d_1 \\)</p>",
            "<p>\\( n \\neq \\text{rev} \\)</p>",
            "<p>\\( n=d_1\\, d_2 \\,\\ldots\\, d_m&nbsp;\\qquad \\mathbf{or} \\qquad&nbsp;\\text{rev} =d_m \\,\\ldots\\, d_2\\, d_1 \\)</p>"
          ],
          "correct_answer": "<p>\\( n=d_1\\, d_2 \\,\\ldots\\, d_{m-i} \\qquad \\mathbf{and} \\qquad \\text{rev} = d_m\\,d_{m-1} \\,\\ldots\\, d_{m-i+1} \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/1029/gate-cse-2004-question-32\" target=\"_blank\">https://gateoverflow.in/1029/gate-cse-2004-question-32</a></p>"
        },
        {
          "id": 6,
          "question": "<p><a name=\"8276\"></a><div itemprop=\"text\"><p>Consider the following pseudo code, where \\( x \\) and \\( y \\) are positive integers.</p>\n\n<pre class=\"prettyprint lang-c_cpp\">begin \n    q := 0 \n    r := x \n   while r ≥ y do \n      begin \n      r := r - y \n      q := q + 1 \n    end \nend</pre>\n\n<p>The post condition that needs to be satisfied after the program terminates is</p>\n\n\n\n</div><br><br><b>GATE CSE 2015 Set 1 | Question: 33</b></p>",
          "type": "single",
          "options": [
            "<p>\\( \\{ r = qx + y&nbsp;\\wedge&nbsp;r &lt; y\\} \\)</p>",
            "<p>\\( \\{ x = qy &nbsp;+ r&nbsp;\\wedge r &lt; y\\} \\)</p>",
            "<p>\\( \\{ y = qx + r&nbsp;\\wedge 0 &lt; r &lt; y\\} \\)</p>",
            "<p>\\( \\{ q + 1 &lt; r - y&nbsp;\\wedge y &gt; 0\\} \\)</p>"
          ],
          "correct_answer": "<p>\\( \\{ x = qy &nbsp;+ r&nbsp;\\wedge r &lt; y\\} \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/8276/gate-cse-2015-set-1-question-33\" target=\"_blank\">https://gateoverflow.in/8276/gate-cse-2015-set-1-question-33</a></p>"
        },
        {
          "id": 7,
          "question": "<p><a name=\"39578\"></a><div itemprop=\"text\"><p>The following function computes \\( X^{Y} \\) for positive integers \\( X \\) and \\( Y \\).</p>\n\n<pre class=\"prettyprint lang-c_cpp\">int exp (int X, int Y) { \n&nbsp;    int res =1, a = X, b = Y;\n&nbsp;  \n&nbsp;    while (b != 0) { \n&nbsp;        if (b % 2 == 0) {a = a * a; b = b/2; } \n&nbsp;        else         {res = res * a; b = b - 1; } \n     } \n     return res; \n}</pre>\n\n<p>Which one of the following conditions is TRUE before every iteration of the loop?</p>\n\n\n\n\n\n</div><br><br><b>GATE CSE 2016 Set 2 | Question: 35</b></p>",
          "type": "single",
          "options": [
            "<p>\\( X^{Y} = a^{b} \\)</p>",
            "<p>\\( (res * a)^{Y} = (res * X)^{b} \\)</p>",
            "<p>\\( X^{Y} = res * a^{b} \\)</p>",
            "<p>\\( X^{Y} = (res * a)^{b} \\)</p>"
          ],
          "correct_answer": "<p>\\( X^{Y} = res * a^{b} \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/39578/gate-cse-2016-set-2-question-35\" target=\"_blank\">https://gateoverflow.in/39578/gate-cse-2016-set-2-question-35</a></p>"
        },
        {
          "id": 8,
          "question": "<p><a name=\"118381\"></a><div itemprop=\"text\"><p>Consider the C program fragment below which is meant to divide \\( x \\) by \\( y \\) using repeated subtractions. The variables \\( x \\), \\( y \\), \\( q \\) and \\( r \\) are all unsigned int.</p>\n\n<pre class=\"prettyprint lang-c_cpp\">while (r &gt;= y) {\n    r=r-y;\n    q=q+1;\n}</pre>\n\n<p>Which of the following conditions on the variables \\( x, y, q \\) and \\( r \\) before the execution of the fragment will ensure that the loop terminated in a state satisfying the condition \\( x==(y*q + r) \\)?</p>\n\n\n\n</div><br><br><b>GATE CSE 2017 Set 2 | Question: 37</b></p>",
          "type": "single",
          "options": [
            "<p>\\( (q==r) \\ \\&\\& \\ (r==0) \\)</p>",
            "<p>\\( (x&gt;0) \\ \\&\\&&nbsp; \\ (r==x) \\ \\&\\& \\ (y&gt;0) \\)</p>",
            "<p>\\( (q==0) \\ \\&\\& \\ (r==x) \\ \\&\\& \\ (y &gt;0) \\)</p>",
            "<p>\\( (q==0) \\ \\&\\& \\ (y&gt;0) \\)</p>"
          ],
          "correct_answer": "<p>\\( (q==0) \\ \\&\\& \\ (r==x) \\ \\&\\& \\ (y &gt;0) \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/118381/gate-cse-2017-set-2-question-37\" target=\"_blank\">https://gateoverflow.in/118381/gate-cse-2017-set-2-question-37</a></p>"
        }
      ]
    }
  ]
});
