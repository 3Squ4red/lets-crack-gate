window.__examLoadCallback({
  "title": "Algorithms - Minimum Spanning Tree",
  "duration": 17,
  "sections": [
    {
      "name": "Minimum Spanning Tree",
      "questions": [
        {
          "id": 1,
          "question": "<p><a name=\"20842\"></a><div itemprop=\"text\"><p>Let \\( G \\) be a connected simple graph (no self-loops or parallel edges) on \\( n\\geq 3 \\) vertices, with distinct edge weights. Let \\( e_{1}, e_{2},...,e_{m} \\) be an ordering of the edges in decreasing order of weight. Which of the following statements is FALSE?</p>\n\n</div><br><br><b>TIFR CSE 2011 | Part B | Question: 35</b></p>",
          "type": "single",
          "options": [
            "<p>The edge \\( e_{1} \\) has to be present in every maximum weight spanning tree.</p>",
            "<p>Both \\( e_{1} \\) and \\( e_{2} \\) have to be present in every maximum weight spanning tree.</p>",
            "<p>The edge \\( e_{m} \\) has to be present in every minimum weight spanning tree.</p>",
            "<p>The edge \\( e_{m} \\) is never present in any maximum weight spanning tree.</p>",
            "<p>\\( G \\) has a unique maximum weight spanning tree.</p>"
          ],
          "correct_answer": "<p>The edge \\( e_{m} \\) is never present in any maximum weight spanning tree.</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/20842/tifr-cse-2011-part-b-question-35\" target=\"_blank\">https://gateoverflow.in/20842/tifr-cse-2011-part-b-question-35</a></p>"
        },
        {
          "id": 2,
          "question": "<p><a name=\"25860\"></a><div itemprop=\"text\"><p>In a connected weighted graph with \\( n \\) vertices, all the edges have distinct positive integer weights.&nbsp;Then, the maximum number of minimum weight spanning trees in the graph is</p>\n\n</div><br><br><b>TIFR CSE 2013 | Part B | Question: 17</b></p>",
          "type": "single",
          "options": [
            "<p>\\( 1 \\)</p>",
            "<p>\\( n \\)</p>",
            "<p>equal to number of edges in the graph.</p>",
            "<p>equal to maximum weight of an edge of the graph.</p>",
            "<p>\\( n^{n-2} \\)</p>"
          ],
          "correct_answer": "<p>\\( 1 \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/25860/tifr-cse-2013-part-b-question-17\" target=\"_blank\">https://gateoverflow.in/25860/tifr-cse-2013-part-b-question-17</a></p>"
        },
        {
          "id": 3,
          "question": "<p><a name=\"27174\"></a><div itemprop=\"text\"><p>Consider the following undirected graph with some edge costs missing.</p>\n\n<p><img alt=\"\" height=\"239\" src=\"images/gateOverFlowPDFsImages/tifr_w_cover/algorithms_minimum_spanning_tree/19695b2b4483bdbd0bf16668afb2d12f.png\" width=\"525\"></p>\n\n<p>Suppose the wavy edges form a Minimum Cost Spanning Tree for \\( G \\). Then, which of the following inequalities&nbsp;NEED NOT hold?</p>\n\n</div><br><br><b>TIFR CSE 2014 | Part B | Question: 4</b></p>",
          "type": "single",
          "options": [
            "<p>cost\\( (a, b)&nbsp;\\geq&nbsp;6 \\).</p>",
            "<p>cost\\( (b, e) \\geq&nbsp;5 \\).</p>",
            "<p>cost\\( (e, f) \\geq&nbsp;5 \\).</p>",
            "<p>cost\\( (a, d) \\geq&nbsp;4 \\).</p>",
            "<p>cost\\( (b, c) \\geq&nbsp;4 \\).</p>"
          ],
          "correct_answer": "<p>cost\\( (a, b)&nbsp;\\geq&nbsp;6 \\).</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/27174/tifr-cse-2014-part-b-question-4\" target=\"_blank\">https://gateoverflow.in/27174/tifr-cse-2014-part-b-question-4</a></p>"
        },
        {
          "id": 6,
          "question": "<p><a name=\"179297\"></a><div itemprop=\"text\"><p>Let \\( n\\geq 3, \\)&nbsp;and let \\( G \\) be a simple, connected, undirected graph with the same number \\( n \\) of vertices and edges. Each edge of&nbsp; \\( G \\) has a distinct real weight associated with it. Let \\( T \\) be the minimum weight spanning tree of \\( G. \\) Which of the following statements is NOT ALWAYS TRUE ?</p>\n\n</div><br><br><b>TIFR CSE 2018 | Part B | Question: 13</b></p>",
          "type": "single",
          "options": [
            "<p>The minimum weight edge of \\( G \\) is in \\( T. \\)</p>",
            "<p>The maximum weight edge of \\( G \\) is not in \\( T. \\)</p>",
            "<p>\\( G \\) has a unique cycle \\( C \\) and the minimum weight edge of \\( C \\) is also in \\( T. \\)</p>",
            "<p>\\( G \\) has a unique cycle \\( C \\) and the maximum weight edge of \\( C \\) is not in \\( T. \\)</p>",
            "<p>\\( T \\) can be found in \\( O(n) \\) time from the adjacency list representation of \\( G. \\)</p>"
          ],
          "correct_answer": "<p>The maximum weight edge of \\( G \\) is not in \\( T. \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/179297/tifr-cse-2018-part-b-question-13\" target=\"_blank\">https://gateoverflow.in/179297/tifr-cse-2018-part-b-question-13</a></p>"
        },
        {
          "id": 7,
          "question": "<p><a name=\"179287\"></a><div itemprop=\"text\"><p>How many distinct minimum weight spanning trees does the following undirected, weighted graph have ?</p>\n\n<p style=\"text-align:center\"><img alt=\"\" height=\"247\" src=\"images/gateOverFlowPDFsImages/tifr_w_cover/algorithms_minimum_spanning_tree/43ceba2dc6b2d8f94f14e413df1f1394.png\" width=\"244\"></p>\n\n</div><br><br><b>TIFR CSE 2018 | Part B | Question: 3</b></p>",
          "type": "single",
          "options": [
            "<p>\\( 1 \\)</p>",
            "<p>\\( 2 \\)</p>",
            "<p>\\( 4 \\)</p>",
            "<p>\\( 6 \\)</p>",
            "<p>\\( 8 \\)</p>"
          ],
          "correct_answer": "<p>\\( 4 \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/179287/tifr-cse-2018-part-b-question-3\" target=\"_blank\">https://gateoverflow.in/179287/tifr-cse-2018-part-b-question-3</a></p>"
        },
        {
          "id": 8,
          "question": "<p><a name=\"280493\"></a><div itemprop=\"text\"><p>How many distinct minimum weight spanning trees does the following undirected, weighted graph have ?</p>\n\n<p style=\"text-align:center\"><img alt=\"\" height=\"274\" src=\"images/gateOverFlowPDFsImages/tifr_w_cover/algorithms_minimum_spanning_tree/3a9839dc7dda052d6bca2d975db8816f.png\" width=\"312\"></p>\n\n\n\n\n</div><br><br><b>TIFR CSE 2019 | Part B | Question: 2</b></p>",
          "type": "single",
          "options": [
            "<p>\\( 8 \\)</p>",
            "<p>\\( 16 \\)</p>",
            "<p>\\( 32 \\)</p>",
            "<p>\\( 64 \\)</p>",
            "<p>None of the above</p>"
          ],
          "correct_answer": "<p>\\( 64 \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/280493/tifr-cse-2019-part-b-question-2\" target=\"_blank\">https://gateoverflow.in/280493/tifr-cse-2019-part-b-question-2</a></p>"
        }
      ]
    }
  ]
});
