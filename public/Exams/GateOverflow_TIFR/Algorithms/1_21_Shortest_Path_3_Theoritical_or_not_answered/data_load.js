window.__examLoadCallback({
  "title": "Algorithms - Shortest Path - Theoretical/Not Answered",
  "duration": 3,
  "sections": [
    {
      "name": "Shortest Path",
      "questions": [
        {
          "id": 1,
          "question": "<p><a name=\"179293\"></a><div itemprop=\"text\"><p>Let \\( G=(V,E) \\) be a DIRECTED graph, where each edge \\( \\large e \\) has a positive weight \\( \\large\\omega(e), \\) and all vertices can be reached from vertex \\( \\large s. \\) For each vertex \\( \\large v, \\) let \\( \\large \\phi(v) \\) be the length of the shortest path from \\( \\large s \\) to \\( \\large v. \\) Let \\( G'=(V,E) \\) be a new weighted graph with the same vertices and edges, but with the edge weight of every edge \\( \\large e=(u\\to v) \\) changed to \\( \\large \\omega'(e)=\\omega(e)+\\phi(v)-\\phi(u). \\) Let \\( P \\) be a path from \\( \\large s \\) to a vertex \\( \\large v, \\) and let \\( \\large \\omega(P)=\\sum_{e\\in P} \\omega_{e}, \\) and \\( \\large \\omega'(P)=\\sum_{e\\in P} \\omega'_{e}. \\)</p>\n\n<p>Which of the following options is NOT NECESSARILY TRUE ?</p>\n\n</div><br><br><b>TIFR CSE 2018 | Part B | Question: 9</b></p>",
          "type": "single",
          "options": [
            "<p>If \\( P \\) is a shortest path in \\( G, \\) then \\( P \\) is a shortest path in \\( G'. \\)</p>",
            "<p>If \\( P \\) is a shortest path in \\( F', \\) then P is a shortest path in \\( G. \\)</p>",
            "<p>If \\( P \\) is a shortest path in \\( G, \\) then \\( \\omega'(P)=2\\times \\omega(P). \\)</p>",
            "<p>If \\( P \\) is NOT a shortest path in \\( G, \\) then \\( \\omega'(P)&lt;2\\times&nbsp;\\omega(P). \\)</p>",
            "<p>All of the above options are necessarily TRUE.</p>"
          ],
          "correct_answer": "E",
          "marks": 1,
          "negative_marks": 0,
          "explanation": "<p><a href=\"https://gateoverflow.in/179293/tifr-cse-2018-part-b-question-9\" target=\"_blank\">https://gateoverflow.in/179293/tifr-cse-2018-part-b-question-9</a></p>"
        }
      ]
    }
  ]
});
