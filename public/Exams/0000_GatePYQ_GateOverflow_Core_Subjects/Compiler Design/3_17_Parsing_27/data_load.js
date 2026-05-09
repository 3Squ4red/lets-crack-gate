window.__examLoadCallback({
  "title": "Compiler Design - Parsing",
  "duration": 58,
  "sections": [
    {
      "name": "Parsing",
      "questions": [
        {
          "id": 1,
          "question": "<p><a name=\"80291\"></a><div itemprop=\"text\"><p>A context-free grammar is ambiguous if:</p></div><br><br><b>GATE CSE 1987 | Question: 1-xii</b></p>",
          "type": "single",
          "options": [
            "<p>The grammar contains useless non-terminals.</p>",
            "<p>It produces more than one parse tree for some sentence.</p>",
            "<p>Some production has two non terminals side by side on the right-hand side.</p>",
            "<p>None of the above.</p>"
          ],
          "correct_answer": "<p>It produces more than one parse tree for some sentence.</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/80291/gate-cse-1987-question-1-xii\" target=\"_blank\">https://gateoverflow.in/80291/gate-cse-1987-question-1-xii</a></p>"
        },
        {
          "id": 2,
          "question": "<p><a name=\"80295\"></a><div itemprop=\"text\"><p>An operator precedence parser is a</p></div><br><br><b>GATE CSE 1987 | Question: 1-xiv</b></p>",
          "type": "single",
          "options": [
            "<p>Bottom-up parser.</p>",
            "<p>Top-down parser.</p>",
            "<p>Back tracking parser.</p>",
            "<p>None of the above.</p>"
          ],
          "correct_answer": "<p>Bottom-up parser.</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/80295/gate-cse-1987-question-1-xiv\" target=\"_blank\">https://gateoverflow.in/80295/gate-cse-1987-question-1-xiv</a></p>"
        },
        {
          "id": 6,
          "question": "<p><a name=\"1664\"></a><div itemprop=\"text\"><p>Type checking is normally done during</p>\n\n</div><br><br><b>GATE CSE 1998 | Question: 1.27</b></p>",
          "type": "single",
          "options": [
            "<p>lexical analysis</p>",
            "<p>syntax analysis</p>",
            "<p>syntax directed translation</p>",
            "<p>code optimization</p>"
          ],
          "correct_answer": "<p>syntax directed translation</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/1664/gate-cse-1998-question-1-27\" target=\"_blank\">https://gateoverflow.in/1664/gate-cse-1998-question-1-27</a></p>"
        },
        {
          "id": 8,
          "question": "<p><a name=\"1470\"></a><div itemprop=\"text\"><p>Which of the following is the most powerful parsing method?</p>    </div><br><br><b>GATE CSE 1999 | Question: 1.17</b></p>",
          "type": "single",
          "options": [
            "<p>LL (1)</p>",
            "<p>Canonical LR</p>",
            "<p>SLR</p>",
            "<p>LALR</p>"
          ],
          "correct_answer": "<p>Canonical LR</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/1470/gate-cse-1999-question-1-17\" target=\"_blank\">https://gateoverflow.in/1470/gate-cse-1999-question-1-17</a></p>"
        },
        {
          "id": 9,
          "question": "<p><a name=\"642\"></a><div itemprop=\"text\"><p>Which of the following derivations does a top-down parser use while parsing an input string? The input is scanned from&nbsp;left to right.</p>\n\n</div><br><br><b>GATE CSE 2000 | Question: 1.19, UGCNET-Dec2013-II: 30</b></p>",
          "type": "single",
          "options": [
            "<p>Leftmost derivation</p>",
            "<p>Leftmost derivation traced out in reverse</p>",
            "<p>Rightmost derivation&nbsp;</p>",
            "<p>Rightmost derivation traced out in reverse</p>"
          ],
          "correct_answer": "<p>Leftmost derivation</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/642/gate-cse-2000-question-1-19-ugcnet-dec2013-ii-30\" target=\"_blank\">https://gateoverflow.in/642/gate-cse-2000-question-1-19-ugcnet-dec2013-ii-30</a></p>"
        },
        {
          "id": 12,
          "question": "<p><a name=\"906\"></a><div itemprop=\"text\">\n<p>Which of the following suffices to convert an arbitrary CFG to an LL(1) grammar?</p>\n\n\n\n\n</div><br><br><b>GATE CSE 2003 | Question: 16</b></p>",
          "type": "single",
          "options": [
            "<p>Removing left recursion alone</p>",
            "<p>Factoring the grammar alone</p>",
            "<p>Removing left recursion and factoring the grammar</p>",
            "<p>None of the above</p>"
          ],
          "correct_answer": "<p>None of the above</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/906/gate-cse-2003-question-16\" target=\"_blank\">https://gateoverflow.in/906/gate-cse-2003-question-16</a></p>"
        },
        {
          "id": 13,
          "question": "<p><a name=\"1405\"></a><div itemprop=\"text\"><p><strong>Statement for Linked Answer Questions 83a & 83b:</strong></p>\n\n<p>Consider the following expression grammar. The semantic rules for expression evaluation are stated next to each grammar production. \\[ \\begin{array}{l|l}&nbsp;E\\rightarrow number & E.val = {number.val} \\\\\\qquad&nbsp;\\mid&nbsp;\\ E \\ \\ ‘+\\text{'}&nbsp;\\ E&nbsp;&&nbsp;E^{(1)}.val = E^{(2)}.val +&nbsp;E^{(3)}.val &nbsp; &nbsp; \\\\\\qquad&nbsp;\\mid&nbsp;\\ E \\ \\ ‘\\times\\text{'}&nbsp;\\&nbsp; E &&nbsp;E^{(1)}.val = E^{(2)}.val \\times E^{(3)}.val&nbsp;&nbsp;\\end{array} \\]</p>\n\n<p>The above grammar and the semantic rules are fed to a <em>yaac</em> tool (which is an LALR(1) parser generator) for parsing and evaluating arithmetic expressions. Which one of the following is true about the action of <em>yaac</em> for the given grammar?</p>\n\n</div><br><br><b>GATE CSE 2005 | Question: 83a</b></p>",
          "type": "single",
          "options": [
            "<p>It detects <em>recursion</em> and eliminates recursion</p>",
            "<p>It detects <em>reduce-reduce</em> conflict, and resolves</p>",
            "<p>It detects <em>shift-reduce</em> conflict, and resolves the conflict in favor of a <em>shift </em>over a <em>reduce</em> action</p>",
            "<p>It detects <em>shift-reduce</em> conflict, and resolves the conflict in favor of a <em>reduce </em>over a <em>shift</em> action</p>"
          ],
          "correct_answer": "<p>It detects <em>shift-reduce</em> conflict, and resolves the conflict in favor of a <em>shift </em>over a <em>reduce</em> action</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/1405/gate-cse-2005-question-83a\" target=\"_blank\">https://gateoverflow.in/1405/gate-cse-2005-question-83a</a></p>"
        },
        {
          "id": 14,
          "question": "<p><a name=\"87037\"></a><div itemprop=\"text\"><p>Consider the following expression grammar. The semantic rules for expression evaluation are stated next to each grammar production.\\[ \\begin{array}{l|l}&nbsp;E\\rightarrow number & E.val = {number.val} \\\\\\qquad&nbsp;\\mid&nbsp;\\ E \\ \\ ‘+\\text{'}&nbsp;\\ E&nbsp;&&nbsp;E^{(1)}.val = E^{(2)}.val +&nbsp;E^{(3)}.val &nbsp; &nbsp; \\\\\\qquad&nbsp;\\mid&nbsp;\\ E \\ \\ ‘\\times\\text{'}&nbsp;\\&nbsp; E &&nbsp;E^{(1)}.val = E^{(2)}.val \\times E^{(3)}.val&nbsp;&nbsp;\\end{array} \\]</p>\n\n<p>Assume the conflicts&nbsp;of this question are resolved using yacc tool and an LALR(1) parser is generated for parsing arithmetic expressions as per the given grammar. Consider an expression \\( 3 \\times&nbsp;2 + 1 \\). What precedence and associativity properties does the generated parser realize?</p>\n\n</div><br><br><b>GATE CSE 2005 | Question: 83b</b></p>",
          "type": "single",
          "options": [
            "<p>Equal precedence and left associativity; expression is evaluated to \\( 7 \\)</p>",
            "<p>Equal precedence and right associativity; expression is evaluated to \\( 9 \\)</p>",
            "<p>Precedence of ‘\\( \\times \\)’ is higher than that of ‘\\( + \\)’, and both operators are left associative; expression is evaluated to \\( 7 \\)</p>",
            "<p>Precedence of ‘\\( + \\)’ is higher than that of ‘\\( \\times \\)’, and both operators are left associative; expression is evaluated to \\( 9 \\)</p>"
          ],
          "correct_answer": "<p>Equal precedence and right associativity; expression is evaluated to \\( 9 \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/87037/gate-cse-2005-question-83b\" target=\"_blank\">https://gateoverflow.in/87037/gate-cse-2005-question-83b</a></p>"
        },
        {
          "id": 15,
          "question": "<p><a name=\"1836\"></a><div itemprop=\"text\"><p>Consider the following grammar:</p>\n\n<ul>\n\t<li>\\( S\\rightarrow FR \\)</li>\n\t<li>\\( R\\rightarrow * S\\mid \\varepsilon \\)</li>\n\t<li>\\( F\\rightarrow &nbsp;id \\)</li>\n</ul>\n\n<p>In the predictive parser table&nbsp;\\( M \\)&nbsp;of the grammar the entries \\( M[S,id] \\) and \\( M[R,\\$] \\) respectively are</p>\n\n</div><br><br><b>GATE CSE 2006 | Question: 58</b></p>",
          "type": "single",
          "options": [
            "<p>\\( \\left \\{ S\\rightarrow FR \\right \\} \\) and \\( \\left \\{ R\\rightarrow \\varepsilon \\right \\} \\)</p>",
            "<p>\\( \\left \\{ S\\rightarrow FR \\right \\} \\) and \\( \\left \\{ \\right \\} \\)</p>",
            "<p>\\( \\left \\{ S\\rightarrow FR \\right \\} \\) and \\( \\left \\{ R\\rightarrow {*}S\\right \\} \\)</p>",
            "<p>\\( \\left \\{ F\\rightarrow id \\right \\} \\) and \\( \\left \\{ R\\rightarrow \\varepsilon \\right \\} \\)</p>"
          ],
          "correct_answer": "<p>\\( \\left \\{ S\\rightarrow FR \\right \\} \\) and \\( \\left \\{ R\\rightarrow \\varepsilon \\right \\} \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/1836/gate-cse-2006-question-58\" target=\"_blank\">https://gateoverflow.in/1836/gate-cse-2006-question-58</a></p>"
        },
        {
          "id": 16,
          "question": "<p><a name=\"1216\"></a><div itemprop=\"text\"><p>Which one of the following is a top-down parser?</p></div><br><br><b>GATE CSE 2007 | Question: 18</b></p>",
          "type": "single",
          "options": [
            "<p>Recursive descent parser.</p>",
            "<p>Operator precedence parser.</p>",
            "<p>An LR(k) parser.</p>",
            "<p>An LALR(k) parser.</p>"
          ],
          "correct_answer": "<p>Recursive descent parser.</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/1216/gate-cse-2007-question-18\" target=\"_blank\">https://gateoverflow.in/1216/gate-cse-2007-question-18</a></p>"
        },
        {
          "id": 17,
          "question": "<p><a name=\"409\"></a><div itemprop=\"text\"><p>Which of the following describes a handle (as applicable to LR-parsing) appropriately?</p>\n\n</div><br><br><b>GATE CSE 2008 | Question: 11</b></p>",
          "type": "single",
          "options": [
            "<p>It is the position in a sentential form where the next shift or reduce operation will occur</p>",
            "<p>It is non-terminal whose production will be used for reduction in the next step</p>",
            "<p>It is a production that may be used for reduction in a future step along with a position in the sentential form where the next shift or reduce operation will occur</p>",
            "<p>It is the production \\( p \\) that will be used for reduction in the next step along with a position in the sentential form where the right hand side of the production may be found</p>"
          ],
          "correct_answer": "<p>It is the production \\( p \\) that will be used for reduction in the next step along with a position in the sentential form where the right hand side of the production may be found</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/409/gate-cse-2008-question-11\" target=\"_blank\">https://gateoverflow.in/409/gate-cse-2008-question-11</a></p>"
        },
        {
          "id": 18,
          "question": "<p><a name=\"1328\"></a><div itemprop=\"text\"><p>Which of the following statements are TRUE?</p>\n\n<ol style=\"list-style-type:upper-roman\">\n\t<li>\n\t<p>There exist parsing algorithms for some programming languages whose complexities are less than \\( \\Theta(n^3) \\)</p>\n\t</li>\n\t<li>\n\t<p>A programming language which allows recursion can be implemented with static storage allocation.</p>\n\t</li>\n\t<li>\n\t<p>No L-attributed definition can be evaluated in the framework of bottom-up parsing.</p>\n\t</li>\n\t<li>\n\t<p>Code improving transformations can be performed at both source language and intermediate code level.</p>\n\t</li>\n</ol>\n\n\n\n\n\n</div><br><br><b>GATE CSE 2009 | Question: 42</b></p>",
          "type": "single",
          "options": [
            "<p>I and II</p>",
            "<p>I and IV</p>",
            "<p>III and IV</p>",
            "<p>I, III and IV</p>"
          ],
          "correct_answer": "<p>I and IV</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/1328/gate-cse-2009-question-42\" target=\"_blank\">https://gateoverflow.in/1328/gate-cse-2009-question-42</a></p>"
        },
        {
          "id": 19,
          "question": "<p><a name=\"2129\"></a><div itemprop=\"text\"><p>Consider two binary operators \\( \\text{‘} \\uparrow \\text{’} \\) &nbsp;and \\( \\text{‘} \\downarrow \\text{’} \\) with the precedence of operator \\( \\downarrow \\) being lower than that of the operator \\( \\uparrow \\). Operator \\( \\uparrow \\) is right associative while operator \\( \\downarrow \\) is left associative. Which one of the following represents the parse tree for expression \\( (7 \\downarrow 3 \\uparrow 4 \\uparrow 3 \\downarrow 2) \\)</p></div><br><br><b>GATE CSE 2011 | Question: 27</b></p>",
          "type": "single",
          "options": [
            "<p><br><img alt=\"\" width=\"340\" src=\"images/gateOverFlowPDFsImages/volume2/compiler_design_parsing/42435a89f9527b19a6230964d30e4271.png\"></p>",
            "<p><br><img alt=\"\" width=\"340\" src=\"images/gateOverFlowPDFsImages/volume2/compiler_design_parsing/4937c960bc31e713d8222fbe96e4c85e.png\"><p>&nbsp;</p></p>",
            "<p><br><img alt=\"\" width=\"340\" src=\"images/gateOverFlowPDFsImages/volume2/compiler_design_parsing/fe5e24604ffa2d1bc22c0cab89f35ec1.png\"><p>&nbsp;</p></p>",
            "<p><br><img alt=\"\" width=\"340\" src=\"images/gateOverFlowPDFsImages/volume2/compiler_design_parsing/86b106011123a61f21f48abd5baa8a43.png\"></p>"
          ],
          "correct_answer": "<p><br><img alt=\"\" width=\"340\" src=\"images/gateOverFlowPDFsImages/volume2/compiler_design_parsing/4937c960bc31e713d8222fbe96e4c85e.png\"><p>&nbsp;</p></p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/2129/gate-cse-2011-question-27\" target=\"_blank\">https://gateoverflow.in/2129/gate-cse-2011-question-27</a></p>"
        },
        {
          "id": 20,
          "question": "<p>For the grammar below, a partial \\( LL(1) \\) parsing table is also presented along with the grammar. Entries that need to be filled are indicated as \\( E1, E2, \\) and \\( E3 \\). \\( \\varepsilon \\) is the empty string, \\( \\$ \\) indicates end of input, and, \\( | \\) separates alternate right hand sides of productions.</p><ul><li> \\( S \\rightarrow aAbB \\mid bAaB \\mid \\varepsilon \\) </li><li> \\( A \\rightarrow S \\) </li><li> \\( B \\rightarrow S \\) </li></ul><p> \\[ \\begin{array}{|c|c|c|c|} \\hline & \\textbf{a} & \\textbf{b} & \\textbf{\\$} \\\\ \\hline S & E1 & E2 & S \\rightarrow \\varepsilon \\\\ \\hline A & A \\rightarrow S & A \\rightarrow S & \\text{error} \\\\ \\hline B & B \\rightarrow S & B \\rightarrow S & E3 \\\\ \\hline \\end{array} \\] </p><p>The appropriate entries for \\( E1, E2, \\) and \\( E3 \\) are</p><br><br><b>GATE CSE 2012 | Question: 53</b>",
          "type": "single",
          "options": [
            "<p>\\( E1 : S \\rightarrow aAbB, A \\rightarrow S \\)<br>\\( E2 : S \\rightarrow bAaB, B \\rightarrow S \\)<br>\\( E3 : B \\rightarrow S \\)</p>",
            "<p>\\( E1 : S \\rightarrow aAbB, S \\rightarrow \\varepsilon \\)<br>\\( E2 : S \\rightarrow bAaB, S \\rightarrow \\varepsilon \\)<br>\\( E3 : S \\rightarrow \\varepsilon \\)</p>",
            "<p>\\( E1 : S \\rightarrow aAbB, S \\rightarrow \\varepsilon \\)<br>\\( E2 : S \\rightarrow bAaB, S \\rightarrow \\varepsilon \\)<br>\\( E3 : B \\rightarrow S \\)</p>",
            "<p>\\( E1 : A \\rightarrow S, S \\rightarrow \\varepsilon \\)<br>\\( E2 : B \\rightarrow S, S \\rightarrow \\varepsilon \\)<br>\\( E3 : B \\rightarrow S \\)</p>"
          ],
          "correct_answer": "<p>\\( E1 : S \\rightarrow aAbB, S \\rightarrow \\varepsilon \\)<br>\\( E2 : S \\rightarrow bAaB, S \\rightarrow \\varepsilon \\)<br>\\( E3 : B \\rightarrow S \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/43312/gate-cse-2012-question-53\" target=\"_blank\">https://gateoverflow.in/43312/gate-cse-2012-question-53</a></p>"
        },
        {
          "id": 21,
          "question": "<p><a name=\"8488\"></a><div itemprop=\"text\"><p>Consider the following grammar <em>G</em></p>\n\n<p>\\( S&nbsp;&nbsp;\\rightarrow&nbsp;F \\mid&nbsp;H \\)</p>\n\n<p>\\( F&nbsp;\\rightarrow&nbsp;p \\mid&nbsp;c \\)</p>\n\n<p>\\( H&nbsp;\\rightarrow&nbsp;d \\mid&nbsp;c \\)&nbsp;</p>\n\n<p>Where \\( S \\), \\( F \\), and \\( H \\) are non-terminal symbols, \\( p, d \\), and \\( c \\) are terminal symbols. Which of the following statement(s) is/are correct?</p>\n\n<p>S1: LL(1) can parse all strings that are generated using grammar <em>G</em></p>\n\n<p>S2:&nbsp;LR(1) can parse all strings that are generated using grammar&nbsp;<em>G</em></p>\n\n</div><br><br><b>GATE CSE 2015 Set 3 | Question: 31</b></p>",
          "type": "single",
          "options": [
            "<p>Only S1</p>",
            "<p>Only S2</p>",
            "<p>Both S1 and S2</p>",
            "<p>Neither S1 and S2</p>"
          ],
          "correct_answer": "<p>Neither S1 and S2</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/8488/gate-cse-2015-set-3-question-31\" target=\"_blank\">https://gateoverflow.in/8488/gate-cse-2015-set-3-question-31</a></p>"
        },
        {
          "id": 22,
          "question": "<p><a name=\"118326\"></a><div itemprop=\"text\"><p>Consider the following grammar:</p>\n\n<ul>\n\t<li>stmt&nbsp;\\( \\rightarrow \\)&nbsp;<strong>if</strong> expr <strong>then</strong> expr <strong>else</strong> expr; stmt | \\( Ò \\)</li>\n\t<li>expr \\( \\rightarrow \\) term <strong>relop</strong> term | term</li>\n\t<li>term \\( \\rightarrow \\) id | number</li>\n\t<li>id \\( \\rightarrow \\)&nbsp;<strong>a</strong> | <strong>b </strong>| <strong>c</strong></li>\n\t<li>number \\( \\rightarrow [0-9] \\)&nbsp;</li>\n</ul>\n\n<p>where <strong>relop</strong> is a relational operator \\( ( \\)e.g.,&nbsp;\\( &lt;&nbsp;,&nbsp;&gt;,\\ldots), \\)&nbsp;\\( Ò \\) refers to the empty statement, and <strong>if</strong>, <strong>then</strong>, <strong>else</strong> are terminals.&nbsp;<br>\nConsider a program \\( P \\) following the above grammar containing ten <strong>if</strong> terminals. The number of control flow paths in \\( P \\) is________&nbsp;. For example. the program&nbsp;<br>\n<strong>if</strong>&nbsp;\\( e_1 \\)&nbsp;<strong>then</strong> \\( e_2 \\) <strong>else</strong> \\( e_3 \\)&nbsp;<br>\nhas \\( 2 \\) control flow paths. \\( e_1&nbsp;\\rightarrow&nbsp;e_2 \\)&nbsp;and \\( e_1&nbsp;\\rightarrow&nbsp;e_3 \\).&nbsp;</p></div><br><br><b>GATE CSE 2017 Set 1 | Question: 43</b></p>",
          "type": "numeric",
          "options": [],
          "correct_answer": "1024",
          "marks": 1,
          "negative_marks": 0,
          "explanation": "<p><a href=\"https://gateoverflow.in/118326/gate-cse-2017-set-1-question-43\" target=\"_blank\">https://gateoverflow.in/118326/gate-cse-2017-set-1-question-43</a></p>"
        },
        {
          "id": 23,
          "question": "<p><a name=\"204112\"></a><div itemprop=\"text\"><p>Consider the following parse tree for the expression a#b\\( \\$ \\)c\\( \\$ \\)d#e#f, involving two binary operators \\( \\$ \\)&nbsp; and #.</p><p><img alt=\"\" height=\"440\" width=\"273\" src=\"images/gateOverFlowPDFsImages/volume2/compiler_design_parsing/92f212989a275308e568c2c7ab8deba3.png\"></p><p>Which one of the following is correct for the given parse tree?</p></div><br><br><b>GATE CSE 2018 | Question: 38</b></p>",
          "type": "single",
          "options": [
            "<p>has higher precedence and is left associative; # is right associative</p>",
            "<p># has higher precedence and is left associative;  is right associative</p>",
            "<p>has higher precedence and is left associative; # is left associative</p>",
            "<p>has higher precedence and is right associative; # is left associative</p>"
          ],
          "correct_answer": "<p>has higher precedence and is left associative; # is right associative</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/204112/gate-cse-2018-question-38\" target=\"_blank\">https://gateoverflow.in/204112/gate-cse-2018-question-38</a></p>"
        },
        {
          "id": 24,
          "question": "<p><a name=\"422826\"></a><div itemprop=\"text\"><p>Which of the following is/are Bottom-Up Parser(s)?</p><p>&nbsp;</p></div><br><br><b>GATE CSE 2024 | Set 1 | Question: 16</b></p>",
          "type": "multiple",
          "options": [
            "<p>Shift-reduce Parser</p>",
            "<p>Predictive Parser</p>",
            "<p>LL\\( (1) \\) Parser&nbsp;</p>",
            "<p>LR Parser</p>"
          ],
          "correct_answer": [
            "<p>Shift-reduce Parser</p>",
            "<p>LR Parser</p>"
          ],
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/422826/gate-cse-2024-set-1-question-16\" target=\"_blank\">https://gateoverflow.in/422826/gate-cse-2024-set-1-question-16</a></p>"
        },
        {
          "id": 25,
          "question": "<p><a name=\"422867\"></a><div itemprop=\"text\"><p>Consider the following context-free grammar where the start symbol is \\( \\text{S} \\) and the set of terminals is \\( \\{a, b, c, d\\} \\).<br>\\[ <br>\\begin{array}{l}<br>S \\rightarrow A a A b \\mid B b B a \\\\<br>A \\rightarrow c S \\mid \\epsilon \\\\<br>B \\rightarrow d S \\mid \\epsilon<br>\\end{array}<br> \\]<br>The following is a partially-filled \\( \\text{LL}(1) \\) parsing table.</p><p>\\( \\begin{array}{|c|c|c|c|c|c|c|}\\hline<br>&a&b&c&d&\\$ \\\\ \\hline<br>S &S\\rightarrow AaAb &S\\rightarrow BbBa &\\text{(1)} & \\text{(2)} & \\\\ \\hline<br>A & A \\rightarrow \\varepsilon &\\text{(3)}&nbsp;& A\\rightarrow cS& & &nbsp;\\\\ \\hline<br>B & \\text{(4)}&nbsp;&{B \\rightarrow &nbsp;\\varepsilon} & &B\\rightarrow dS& \\\\ \\hline<br>\\end{array} \\)</p><p>Which one of the following options represents the CORRECT combination for the numbered cells in the parsing table?<br><br><em>Note: In the options, \"blank\" denotes that the corresponding cell is empty.</em></p></div><br><br><b>GATE CSE 2024 | Set 2 | Question: 30</b></p>",
          "type": "single",
          "options": [
            "<p>\\( (1) \\) \\( S \\rightarrow A a A b \\) \\( (2) \\) \\( S \\rightarrow B b B a \\) \\( (3) \\) \\( A \\rightarrow \\epsilon \\) \\( (4) \\) \\( B \\rightarrow \\epsilon \\)</p>",
            "<p>\\( (1) \\) \\( S \\rightarrow B b B a \\) \\( (2) \\) \\( S \\rightarrow A a A b \\) \\( (3) \\) \\( A \\rightarrow \\epsilon \\) \\( (4) \\) \\( B \\rightarrow \\epsilon \\)</p>",
            "<p>\\( (1) \\) \\( S \\rightarrow A a A b \\) \\( (2) \\) \\( S \\rightarrow B b B a \\) \\( (3) \\) blank \\( (4) \\) blank</p>",
            "<p>\\( (1) \\) \\( S \\rightarrow B b B a \\) \\( (2) \\) \\( S \\rightarrow A a A b \\) \\( (3) \\) blank \\( (4) \\) blank</p>"
          ],
          "correct_answer": "<p>\\( (1) \\) \\( S \\rightarrow A a A b \\) \\( (2) \\) \\( S \\rightarrow B b B a \\) \\( (3) \\) \\( A \\rightarrow \\epsilon \\) \\( (4) \\) \\( B \\rightarrow \\epsilon \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/422867/gate-cse-2024-set-2-question-30\" target=\"_blank\">https://gateoverflow.in/422867/gate-cse-2024-set-2-question-30</a></p>"
        },
        {
          "id": 26,
          "question": "<p><a name=\"3850\"></a><div itemprop=\"text\"><p>Consider the context-free grammar</p>\n\n<ul>\n\t<li>\\( E\\rightarrow E+E \\)</li>\n\t<li>\\( E\\rightarrow (E *E) \\)</li>\n\t<li>\\( E\\rightarrow \\text{id} \\)</li>\n</ul>\n\n<p>where \\( E \\) is the starting symbol, the set of terminals is \\( \\{id, (,+,),*\\} \\), and the set of non-terminals is \\( \\{E\\} \\).</p>\n\n<p>For the terminal string \\( id + id + id + id \\), how many parse trees are possible?</p>\n\n</div><br><br><b>GATE IT 2005 | Question: 83b</b></p>",
          "type": "single",
          "options": [
            "<p>\\( 5 \\)</p>",
            "<p>\\( 4 \\)</p>",
            "<p>\\( 3 \\)</p>",
            "<p>\\( 2 \\)</p>"
          ],
          "correct_answer": "<p>\\( 5 \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/3850/gate-it-2005-question-83b\" target=\"_blank\">https://gateoverflow.in/3850/gate-it-2005-question-83b</a></p>"
        },
        {
          "id": 27,
          "question": "<p><a name=\"3393\"></a><div itemprop=\"text\"><p>\\( A \\) CFG \\( G \\) is given with the following productions where \\( S \\) is the start symbol, \\( A \\) is a non-terminal and a and b are terminals.</p><ul><li>\\( S → aS \\mid A \\)</li><li>\\( A → aAb \\mid bAa \\mid \\epsilon \\)</li></ul><p>For the string \"\\( aabbaab \\)\" how many steps are required to derive the string and how many parse trees are there?</p></div><br><br><b>GATE IT 2008 | Question: 79</b></p>",
          "type": "single",
          "options": [
            "<p>\\( 6 \\) and \\( 1 \\)</p>",
            "<p>\\( 6 \\) and \\( 2 \\)</p>",
            "<p>\\( 7 \\) and \\( 2 \\)</p>",
            "<p>\\( 4 \\) and \\( 2 \\)</p>"
          ],
          "correct_answer": "<p>\\( 6 \\) and \\( 1 \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/3393/gate-it-2008-question-79\" target=\"_blank\">https://gateoverflow.in/3393/gate-it-2008-question-79</a></p>"
        }
      ]
    }
  ]
});
