window.__examLoadCallback({
  "title": "Algorithms - Binary Search - Theoretical/Not Answered",
  "duration": 3,
  "sections": [
    {
      "name": "Binary Search",
      "questions": [
        {
          "id": 2,
          "question": "<p><a name=\"25140\"></a><div itemprop=\"text\"><p>Consider the following three version of the binary search program. Assume that the elements of type \\( T \\) can be compared with each other; also assume that the array is sorted.</p>\n\n<pre class=\"prettyprint lang-c_cpp\">i, j, k : integer;  \na : array [1....N] of T;   \nx : T;                       \n\nProgram 1 :   i := 1; j := N;   \n             repeat   \n                   k := (i + j) div 2; \n                   if a[k] &lt; x then i := k else j := k  \n             until (a[k] = x) or (i &gt; j)                   \nProgram 2 :   i := 1; j := N;  \n              repeat  \n                   k := (i + j) div 2;   \n                  if x &lt; a[k] then j := k - 1; \n                  if a[k] &lt; x then i := k + 1;\n              until i &gt; j                              \nProgram 3 :=  i := 1; j := N  \n&nbsp;             repeat\n&nbsp;                  k := (i + j) div 2; \n&nbsp;                 if x &lt; a[k] then j := k else i := k + 1 \n&nbsp;             until i &gt; j</pre>\n\n<p>A binary search program is called correct provided it terminates with \\( a[k] = x \\) whenever such an element exists, or it terminates with \\( a\\left [ k \\right ]\\neq &nbsp;x \\) if there exists no array element with value \\( x \\). Which of the following statements is correct?</p>\n\n</div><br><br><b>TIFR CSE 2012 | Part B | Question: 11</b></p>",
          "type": "single",
          "options": [
            "<p>Only Program \\( 1 \\) is correct</p>",
            "<p>Only Program \\( 2 \\) is correct</p>",
            "<p>Only Program \\( 1 \\) and \\( 2 \\) are correct.</p>",
            "<p>Both Program \\( 2 \\) and \\( 3 \\) are correct</p>",
            "<p>All the three programs are wrong</p>"
          ],
          "correct_answer": "E",
          "marks": 1,
          "negative_marks": 0,
          "explanation": "<p><a href=\"https://gateoverflow.in/25140/tifr-cse-2012-part-b-question-11\" target=\"_blank\">https://gateoverflow.in/25140/tifr-cse-2012-part-b-question-11</a></p>"
        }
      ]
    }
  ]
});
