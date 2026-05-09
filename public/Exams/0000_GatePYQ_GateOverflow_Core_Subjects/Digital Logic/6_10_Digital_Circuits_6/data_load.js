window.__examLoadCallback({
  "title": "Digital Logic - Digital Circuits",
  "duration": 11,
  "sections": [
    {
      "name": "Digital Circuits",
      "questions": [
        {
          "id": 3,
          "question": "<p><a name=\"29098\"></a><div itemprop=\"text\"><p>Consider the following circuit composed of XOR gates and non-inverting buffers.</p>\n\n<p><img alt=\"\" src=\"images/gateOverFlowPDFsImages/volume2/digital_logic_digital_circuits/f20dee573a1729481738e02d4d8f18ed.png\"></p>\n\n<p>The non-inverting buffers have delays \\( \\delta_1 = 2 ns \\) and \\( \\delta_2 = 4 ns \\) as shown in the figure. Both XOR gates and all wires have zero delays. Assume that all gate inputs, outputs, and wires are stable at logic level \\( 0 \\)&nbsp;at time \\( 0 \\). If the following waveform is applied at input \\( A \\), how many transition(s) (change of logic levels) occur(s) at \\( B \\) during the interval from \\( 0 \\) to \\( 10 \\) ns?</p>\n\n<p><img alt=\"\" src=\"images/gateOverFlowPDFsImages/volume2/digital_logic_digital_circuits/eb04d8f0400f400ddba696370c2b40b5.png\"></p>\n\n</div><br><br><b>GATE CSE 2003 | Question: 47</b></p>",
          "type": "single",
          "options": [
            "<p>\\( 1 \\)</p>",
            "<p>\\( 2 \\)</p>",
            "<p>\\( 3 \\)</p>",
            "<p>\\( 4 \\)</p>"
          ],
          "correct_answer": "<p>\\( 4 \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/29098/gate-cse-2003-question-47\" target=\"_blank\">https://gateoverflow.in/29098/gate-cse-2003-question-47</a></p>"
        },
        {
          "id": 4,
          "question": "<p><a name=\"2115\"></a><div itemprop=\"text\"><p>Which one of the following circuits is&nbsp;<strong>NOT&nbsp;</strong>equivalent to a \\( 2 \\)-input \\( XNOR \\) (exclusive \\( NOR \\)) gate?</p></div><br><br><b>GATE CSE 2011 | Question: 13</b></p>",
          "type": "single",
          "options": [
            "<p><img alt=\"\" width=\"350\" height=\"92\" src=\"images/gateOverFlowPDFsImages/volume2/digital_logic_digital_circuits/4a67ca1db1c4e5cff78cee469d524ae1.png\"></p>",
            "<p><img alt=\"\" width=\"400\" height=\"111\" src=\"images/gateOverFlowPDFsImages/volume2/digital_logic_digital_circuits/e5a6dbe681b9037a032917e72581beed.png\"></p>",
            "<p><img alt=\"\" width=\"400\" height=\"142\" src=\"images/gateOverFlowPDFsImages/volume2/digital_logic_digital_circuits/70d78dd9c0e85d9ef58e4951b32fd424.png\"></p>",
            "<p><img alt=\"\" src=\"images/gateOverFlowPDFsImages/volume2/digital_logic_digital_circuits/12f4daaa74001ae57928be209af64498.png\"></p>",
            "<p><img alt=\"\" width=\"400\" height=\"162\" src=\"images/gateOverFlowPDFsImages/volume2/digital_logic_digital_circuits/caf8b5e50aa4dccb993cb1aae34fafbe.png\"></p>"
          ],
          "correct_answer": "<p><img alt=\"\" src=\"images/gateOverFlowPDFsImages/volume2/digital_logic_digital_circuits/12f4daaa74001ae57928be209af64498.png\"></p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/2115/gate-cse-2011-question-13\" target=\"_blank\">https://gateoverflow.in/2115/gate-cse-2011-question-13</a></p>"
        },
        {
          "id": 5,
          "question": "<p><a name=\"1414\"></a><div itemprop=\"text\"><p>In the following truth table, \\( V = 1 \\) if and only if the input is valid.</p>\n\n<p>\\[ \\begin{array}{cc}<br>\n\\textbf{Inputs}&\\textbf{Outputs}\\\\&nbsp;<br>\n\\begin{array}{|c|c|c|c|} \\hline<br>\n{D_0}&D_1&D_2&D_3&nbsp;\\\\ \\hline<br>\n0&0&0&0 \\\\ \\hline<br>\n1&0&0&0 \\\\ \\hline<br>\n\\text{x}&1&0&0 \\\\ \\hline<br>\n\\text{x}&\\text{x}&1&0 \\\\ \\hline<br>\n\\text{x}&\\text{x}&\\text{x}&1&nbsp;\\\\ \\hline<br>\n\\end{array}&<br>\n\\begin{array}{|c|c|c|} \\hline<br>\nX_0&X_1&V \\\\ \\hline<br>\n\\text{x}&\\text{x}&0\\\\ \\hline<br>\n0&0&1\\\\ \\hline<br>\n0&1&1\\\\ \\hline<br>\n1&0&1\\\\ \\hline<br>\n1&1&1\\\\ \\hline<br>\n\\end{array} \\\\<br>\n\\end{array} \\]</p>\n\n<p>What function does the truth table represent?</p>\n\n</div><br><br><b>GATE CSE 2013 | Question: 5</b></p>",
          "type": "single",
          "options": [
            "<p>Priority encoder &nbsp; &nbsp;</p>",
            "<p>Decoder &nbsp; &nbsp;</p>",
            "<p>Multiplexer &nbsp; &nbsp;</p>",
            "<p>Demultiplexer</p>"
          ],
          "correct_answer": "<p>Priority encoder &nbsp; &nbsp;</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/1414/gate-cse-2013-question-5\" target=\"_blank\">https://gateoverflow.in/1414/gate-cse-2013-question-5</a></p>"
        },
        {
          "id": 6,
          "question": "<p><a name=\"2042\"></a><div itemprop=\"text\"><p>Consider the following combinational function block involving four Boolean variables \\( x,\\:y,\\:a,\\:b \\) where \\( x,\\:a,\\:b \\) are inputs and \\( y \\) is the output.</p>\n\n<pre class=\"prettyprint lang-c_cpp\">f(x, a, b, y)\n{\n    if(x is 1) y = a;\n    else y = b;\n}</pre>\n\n<p>Which one of the following digital logic blocks is the most suitable for implementing this function?</p>\n\n</div><br><br><b>GATE CSE 2014 Set 3 | Question: 8</b></p>",
          "type": "single",
          "options": [
            "<p>Full adder</p>",
            "<p>Priority encoder</p>",
            "<p>Multiplexor</p>",
            "<p>Flip-flop</p>"
          ],
          "correct_answer": "<p>Multiplexor</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/2042/gate-cse-2014-set-3-question-8\" target=\"_blank\">https://gateoverflow.in/2042/gate-cse-2014-set-3-question-8</a></p>"
        }
      ]
    }
  ]
});
