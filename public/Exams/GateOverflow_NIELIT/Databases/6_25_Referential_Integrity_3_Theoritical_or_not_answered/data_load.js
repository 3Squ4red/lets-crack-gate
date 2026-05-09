window.__examLoadCallback({
  "title": "Databases - Referential Integrity - Theoretical/Not Answered",
  "duration": 3,
  "sections": [
    {
      "name": "Referential Integrity",
      "questions": [
        {
          "id": 1,
          "question": "<p><a name=\"275515\"></a><div itemprop=\"text\"><p>The following table has two attributes \\( X \\) and \\( Y \\) where \\( X \\) is the primary key and \\( Y \\) is the foreign key referencing \\( X \\) with on-delete cascade.</p>\n\n<p>\\( \\begin{array}{|c|c|} \\hline X & Y \\\\ \\hline 2 & 4 \\\\ \\hline 3 & 4 \\\\ \\hline 4 & 3 \\\\ \\hline 5 & 2&nbsp; \\\\ \\hline 7 & 2 \\\\ \\hline 9 & 5 \\\\ \\hline 6 & 4 \\\\ \\hline\\end{array} \\)</p>\n\n<p>The set of all tuples that must be additionally deleted to preserve referential integrity when the tuple \\( (3,4) \\) is deleted is</p>\n\n</div><br><br><b>NIELIT 2018-49</b></p>",
          "type": "single",
          "options": [
            "<p>\\( (4,3) \\) and \\( (6,4) \\)</p>",
            "<p>\\( (2,4) \\) and \\( (7,2) \\)</p>",
            "<p>\\( (3,2) \\) and \\( (9,5) \\)</p>",
            "<p>\\( (3,4), (4,5) \\) and \\( (6,4) \\)</p>"
          ],
          "correct_answer": "X",
          "marks": 1,
          "negative_marks": 0,
          "explanation": "<p><a href=\"https://gateoverflow.in/275515/nielit-2018-49\" target=\"_blank\">https://gateoverflow.in/275515/nielit-2018-49</a></p>"
        }
      ]
    }
  ]
});
