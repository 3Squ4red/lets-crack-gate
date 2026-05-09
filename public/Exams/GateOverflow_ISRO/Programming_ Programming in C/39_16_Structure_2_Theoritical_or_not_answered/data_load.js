window.__examLoadCallback({
  "title": "Programming_ Programming in C - Structure - Theoretical/Not Answered",
  "duration": 3,
  "sections": [
    {
      "name": "Structure",
      "questions": [
        {
          "id": 2,
          "question": "<p><a name=\"331318\"></a><div itemprop=\"text\"><p>Following declaration of an array of struct, assumes size of byte, short, int and long are \\( 1,2,3 \\) and \\( 4 \\) respectively. Alignment rule stipulates that \\( n \\) – byte field must be located at an address divisible by \\( n \\),&nbsp;the fields in the struct are not rearranged, padding is used to ensure alignment. All elements of array should be of same size.</p>\n\n<pre class=\"prettyprint linenums lang-c_cpp\" data-pbcklang=\"c_cpp\" data-pbcktabsize=\"4\">Struct complx\n       Short s\n       Byte b\n       Long l\n       Int i\nEnd Complx\nComplx C[10]</pre>\n\n<p>Assuming \\( C \\) is located at an address divisble by \\( 8 \\), what is the total size of \\( C \\), in bytes?</p>\n\n</div><br><br><b>ISRO CSE 2020 | Question: 74</b></p>",
          "type": "single",
          "options": [
            "<p>\\( 150 \\)</p>",
            "<p>\\( 160 \\)</p>",
            "<p>\\( 200 \\)</p>",
            "<p>\\( 240 \\)</p>"
          ],
          "correct_answer": "X",
          "marks": 1,
          "negative_marks": 0,
          "explanation": "<p><a href=\"https://gateoverflow.in/331318/isro-cse-2020-question-74\" target=\"_blank\">https://gateoverflow.in/331318/isro-cse-2020-question-74</a></p>"
        }
      ]
    }
  ]
});
