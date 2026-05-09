window.__examLoadCallback({
  "title": "Theory of Computation - Pushdown Automata",
  "duration": 30,
  "sections": [
    {
      "name": "Pushdown Automata",
      "questions": [
        {
          "id": 2,
          "question": "<p><a name=\"2262\"></a><div itemprop=\"text\"><p>Which of the following languages over \\( \\left\\{a,b,c\\right\\} \\) is accepted by a deterministic pushdown automata?</p>\n\n\n\n<p><br>\nNote: \\( w^R \\) is the string obtained by reversing \\( 'w' \\).</p></div><br><br><b>GATE CSE 1997 | Question: 6.6</b></p>",
          "type": "single",
          "options": [
            "<p>\\( \\left\\{ wcw^R \\mid w \\in \\left\\{a,b\\right\\}^*\\right\\} \\)</p>",
            "<p>\\( \\left\\{ ww^R \\mid w \\in \\{a,b,c\\}^*\\right\\} \\)</p>",
            "<p>\\( \\left\\{ a^nb^nc^n \\mid n \\geq 0 \\right\\} \\)</p>",
            "<p>\\( \\left\\{w \\mid w \\text{is a palindrome over} \\left\\{a,b,c\\right\\} \\right\\} \\)</p>"
          ],
          "correct_answer": "<p>\\( \\left\\{ wcw^R \\mid w \\in \\left\\{a,b\\right\\}^*\\right\\} \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/2262/gate-cse-1997-question-6-6\" target=\"_blank\">https://gateoverflow.in/2262/gate-cse-1997-question-6-6</a></p>"
        },
        {
          "id": 4,
          "question": "<p><a name=\"377\"></a><div itemprop=\"text\"><p>Let \\( L_1 \\)&nbsp;be the set of all languages accepted by a PDA by final state and \\( L_2 \\)&nbsp;the set of all languages accepted by empty stack. Which of the following is true?</p>\n\n</div><br><br><b>GATE CSE 1999 | Question: 1.6</b></p>",
          "type": "single",
          "options": [
            "<p>\\( L_1 =&nbsp;L_2 \\)</p>",
            "<p>\\( L_1 \\supset&nbsp;L_2 \\)</p>",
            "<p>\\( L_1 \\subset&nbsp;L_2 \\)</p>",
            "<p>None</p>"
          ],
          "correct_answer": "<p>\\( L_1 =&nbsp;L_2 \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/377/gate-cse-1999-question-1-6\" target=\"_blank\">https://gateoverflow.in/377/gate-cse-1999-question-1-6</a></p>"
        },
        {
          "id": 7,
          "question": "<p><a name=\"1308\"></a><div itemprop=\"text\"><p>Which one of the following is FALSE?</p>\n\n</div><br><br><b>GATE CSE 2009 | Question: 16, ISRO2017-12</b></p>",
          "type": "single",
          "options": [
            "<p>There is a unique minimal DFA for every regular language</p>",
            "<p>Every NFA can be converted to an equivalent PDA.</p>",
            "<p>Complement of every context-free language is recursive.</p>",
            "<p>Every nondeterministic PDA can be converted to an equivalent deterministic PDA.</p>"
          ],
          "correct_answer": "<p>Every nondeterministic PDA can be converted to an equivalent deterministic PDA.</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/1308/gate-cse-2009-question-16-isro2017-12\" target=\"_blank\">https://gateoverflow.in/1308/gate-cse-2009-question-16-isro2017-12</a></p>"
        },
        {
          "id": 8,
          "question": "<p><a name=\"8357\"></a><div itemprop=\"text\"><p>Consider the NPDA&nbsp;\\[ \\left \\langle Q= \\left \\{ q_{0}, q_{1}, q_{2} \\right \\},\\Sigma = \\left \\{ 0, 1 \\right \\}, \\Gamma = \\left \\{ 0, 1, \\perp &nbsp;\\right \\}, \\delta, q_{0}, \\perp, F =\\left \\{ q_{2} \\right \\} \\right \\rangle \\],&nbsp;where (as per usual convention) \\( Q \\) is the set of states, \\( \\Sigma \\) is the input alphabet, \\( \\Gamma&nbsp; \\) is the stack alphabet, \\( \\delta&nbsp; \\) is the state transition function \\( q_{0} \\) is the initial state, \\( \\perp&nbsp; \\) is the initial stack symbol, and \\( F \\) is the set of accepting states. The state transition is as follows:</p>\n\n<p style=\"text-align:center\"><img alt=\"\" height=\"216\" src=\"images/gateOverFlowPDFsImages/volume2/theory_of_computation_pushdown_automata/28ec33f53bc7d5fc9349a40cf873ded6.png\" width=\"647\"></p>\n\n<p>Which one of the following sequences must follow the string \\( 101100 \\) so that the overall string is accepted by the automaton?</p>\n\n</div><br><br><b>GATE CSE 2015 Set 1 | Question: 51</b></p>",
          "type": "single",
          "options": [
            "<p>\\( 10110 \\)</p>",
            "<p>\\( 10010 \\)</p>",
            "<p>\\( 01010 \\)</p>",
            "<p>\\( 01001 \\)</p>"
          ],
          "correct_answer": "<p>\\( 10010 \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/8357/gate-cse-2015-set-1-question-51\" target=\"_blank\">https://gateoverflow.in/8357/gate-cse-2015-set-1-question-51</a></p>"
        },
        {
          "id": 9,
          "question": "<p><a name=\"39732\"></a><div itemprop=\"text\"><p>Consider the transition diagram of a PDA given below with input alphabet&nbsp;\\( \\Sigma=\\{a,b\\} \\) and stack alphabet&nbsp;\\( \\Gamma = \\{X,Z\\} \\).&nbsp;\\( Z \\)&nbsp;is the initial stack symbol. Let \\( L \\) denote the language accepted by the PDA</p>\n\n<p style=\"text-align:center\"><img alt=\"\" height=\"184\" src=\"images/gateOverFlowPDFsImages/volume2/theory_of_computation_pushdown_automata/228a86b05ead7f96e67523fdb0cc16b5.png\" width=\"524\"></p>\n\n<p>Which one of the following is <strong>TRUE</strong>?&nbsp;</p>\n\n</div><br><br><b>GATE CSE 2016 Set 1 | Question: 43</b></p>",
          "type": "single",
          "options": [
            "<p>\\( L =\\{a^nb^n\\mid n \\geq0 \\} \\) and is not accepted by any finite automata&nbsp;</p>",
            "<p>\\( L =\\{a^n\\mid n \\geq0 \\} \\cup \\{a^nb^n \\mid n \\geq 0\\} \\) and is not accepted by any deterministic PDA&nbsp;</p>",
            "<p>\\( L \\) is not accepted by any Turing machine that halts on every input&nbsp;</p>",
            "<p>\\( L =\\{a^n\\mid n \\geq0 \\} \\cup \\{a^nb^n \\mid n \\geq 0\\} \\) and is deterministic context-free</p>"
          ],
          "correct_answer": "<p>\\( L =\\{a^n\\mid n \\geq0 \\} \\cup \\{a^nb^n \\mid n \\geq 0\\} \\) and is deterministic context-free</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/39732/gate-cse-2016-set-1-question-43\" target=\"_blank\">https://gateoverflow.in/39732/gate-cse-2016-set-1-question-43</a></p>"
        },
        {
          "id": 10,
          "question": "<p><a name=\"357400\"></a><div itemprop=\"text\"><p>In a&nbsp; pushdown automaton \\( P=(Q, \\Sigma, \\Gamma, \\delta, q_0, F) \\), a transition of the form,</p>\n\n<p style=\"text-align:center\"><img alt=\"\" height=\"99\" src=\"images/gateOverFlowPDFsImages/volume2/theory_of_computation_pushdown_automata/d57da72db423a71f6c65cc349cdc3afa.png\" width=\"324\"></p>\n\n<p>where \\( p,q \\in Q \\), \\( a \\in \\Sigma \\cup \\{ \\epsilon \\} \\), and \\( X,Y&nbsp;\\in \\Gamma \\cup \\{ \\epsilon \\} \\), represents \\[ (q,Y) \\in \\delta(p,a,X). \\]Consider the following pushdown automaton over the input alphabet \\( \\Sigma = \\{a,b\\} \\) and stack alphabet \\( \\Gamma = \\{ \\#, A\\} \\).</p>\n\n<p style=\"text-align:center\"><img alt=\"\" src=\"images/gateOverFlowPDFsImages/volume2/theory_of_computation_pushdown_automata/7c60a3427cd0a78c41879020b71e88c2.png\" width=\"750\"></p>\n\n<p>The number of strings of length \\( 100 \\) accepted by the above pushdown automaton is ___________</p></div><br><br><b>GATE CSE 2021 Set 1 | Question: 51</b></p>",
          "type": "numeric",
          "options": [],
          "correct_answer": "50:50",
          "marks": 1,
          "negative_marks": 0,
          "explanation": "<p><a href=\"https://gateoverflow.in/357400/gate-cse-2021-set-1-question-51\" target=\"_blank\">https://gateoverflow.in/357400/gate-cse-2021-set-1-question-51</a></p>"
        },
        {
          "id": 11,
          "question": "<p><a name=\"399281\"></a><div itemprop=\"text\"><p>Consider the pushdown automaton \\( \\text{(PDA)}\\;P \\) below, which runs on the input alphabet \\( \\{a, b\\} \\), has stack alphabet \\( \\{\\perp, A\\} \\), and has three states \\( \\{s, p, q\\} \\), with \\( s \\) being the start state. A transition from state \\( u \\) to state \\( v \\), labelled \\( c / X / \\gamma \\), where \\( c \\) is an input symbol or \\( \\epsilon, X \\) is a stack symbol, and \\( \\gamma \\) is a string of stack symbols, represents the fact that in state \\( u \\), the \\( \\text{(PDA)} \\) can read \\( c \\) from the input, with \\( X \\) on the top of its stack, pop \\( X \\) from the stack, push in the string \\( \\gamma \\) on the stack, and go to state \\( v \\). In the initial configuration, the stack has only the symbol \\( \\perp \\) in it. The \\( \\text{(PDA)} \\) accepts by empty stack.</p><p style=\"text-align:center\"><img alt=\"\" width=\"350\" height=\"395\" src=\"images/gateOverFlowPDFsImages/volume2/theory_of_computation_pushdown_automata/6ab109e7ec6314c0ad88da2eabf2211f.png\"></p><p>Which one of the following options correctly describes the language accepted by \\( P ? \\)</p></div><br><br><b>GATE CSE 2023 | Question: 30</b></p>",
          "type": "single",
          "options": [
            "<p>\\( \\left\\{a^{m} b^{n} \\mid 1 \\leq m\\right. \\) and \\( \\left.n&nbsp;\\lt&nbsp;m\\right\\} \\)</p>",
            "<p>\\( \\left\\{a^{m} b^{n} \\mid 0 \\leq n \\leq m\\right\\} \\)</p>",
            "<p>\\( \\left\\{a^{m} b^{n} \\mid 0 \\leq m\\right. \\) and \\( \\left.0 \\leq n\\right\\} \\)</p>",
            "<p>\\( \\left\\{a^{m} \\mid 0 \\leq m\\right\\} \\cup\\left\\{b^{n} \\mid 0 \\leq n\\right\\} \\)</p>"
          ],
          "correct_answer": "<p>\\( \\left\\{a^{m} b^{n} \\mid 1 \\leq m\\right. \\) and \\( \\left.n&nbsp;\\lt&nbsp;m\\right\\} \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/399281/gate-cse-2023-question-30\" target=\"_blank\">https://gateoverflow.in/399281/gate-cse-2023-question-30</a></p>"
        },
        {
          "id": 12,
          "question": "<p><a name=\"3683\"></a><div itemprop=\"text\"><p>Let \\( M = (K, Σ, Г, Δ, s, F) \\) be a pushdown automaton, where</p>\n\n<p>\\( K = (s, f), F = \\{f\\}, \\Sigma = \\{a, b\\}, Г = \\{a\\} \\) and<br>\n\\( Δ = \\{((s, a, \\epsilon), (s, a)), ((s, b, \\epsilon), (s, a)), (( s, a, a), (f, \\epsilon)), ((f, a, a), (f, \\epsilon)), ((f, b, a), (f, \\epsilon))\\} \\).</p>\n\n<p>Which one of the following strings is not a member of \\( L(M) \\)?</p>\n\n</div><br><br><b>GATE IT 2004 | Question: 40</b></p>",
          "type": "single",
          "options": [
            "<p>\\( aaa \\)</p>",
            "<p>\\( aabab \\)</p>",
            "<p>\\( baaba \\)</p>",
            "<p>\\( bab \\)</p>"
          ],
          "correct_answer": "<p>\\( aabab \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/3683/gate-it-2004-question-40\" target=\"_blank\">https://gateoverflow.in/3683/gate-it-2004-question-40</a></p>"
        },
        {
          "id": 13,
          "question": "<p><a name=\"3785\"></a><div itemprop=\"text\"><p>Let \\( P \\) be a non-deterministic push-down automaton (NPDA) with exactly one state, \\( q \\), and exactly one symbol, \\( Z \\), in its stack alphabet. State \\( q \\) is both the starting as well as the accepting state of the PDA. The stack is initialized with one \\( Z \\) before the start of the operation of the PDA. Let the input alphabet of the PDA be \\( Σ \\). Let \\( L(P) \\) be the language accepted by the PDA by reading a string and reaching its accepting state. Let \\( N(P) \\) be the language accepted by the PDA by reading a string and emptying its stack.<br>\nWhich of the following statements is TRUE?</p>\n\n</div><br><br><b>GATE IT 2005 | Question: 38</b></p>",
          "type": "single",
          "options": [
            "<p>\\( L(P) \\) is necessarily \\( Σ^* \\) but \\( N(P) \\) is not necessarily \\( Σ^* \\).</p>",
            "<p>\\( N(P) \\) is necessarily \\( Σ^* \\) but \\( L(P) \\) is not necessarily \\( Σ^* \\).</p>",
            "<p>Both \\( L(P) \\) and \\( N(P) \\) are necessarily \\( Σ^* \\).</p>",
            "<p>Neither \\( L(P) \\)&nbsp;nor&nbsp;\\( N(P) \\)&nbsp;are necessarily \\( Σ^* \\)</p>"
          ],
          "correct_answer": "<p>Neither \\( L(P) \\)&nbsp;nor&nbsp;\\( N(P) \\)&nbsp;are necessarily \\( Σ^* \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/3785/gate-it-2005-question-38\" target=\"_blank\">https://gateoverflow.in/3785/gate-it-2005-question-38</a></p>"
        },
        {
          "id": 14,
          "question": "<p><a name=\"3570\"></a><div itemprop=\"text\"><p>Which of the following languages is accepted by a non-deterministic pushdown automaton (PDA) but NOT by a deterministic PDA?</p>\n\n</div><br><br><b>GATE IT 2006 | Question: 31</b></p>",
          "type": "single",
          "options": [
            "<p>\\( \\{a^nb^nc^n&nbsp;\\mid n ≥ 0\\} \\)</p>",
            "<p>\\( \\{a^lb^mc^n&nbsp;\\mid l ≠ m \\text{or} m ≠ n\\} \\)</p>",
            "<p>\\( \\{a^nb^n&nbsp;\\mid n ≥ 0\\} \\)</p>",
            "<p>\\( \\{a^mb^n \\mid&nbsp;m, n ≥ 0\\} \\)</p>"
          ],
          "correct_answer": "<p>\\( \\{a^lb^mc^n&nbsp;\\mid l ≠ m \\text{or} m ≠ n\\} \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/3570/gate-it-2006-question-31\" target=\"_blank\">https://gateoverflow.in/3570/gate-it-2006-question-31</a></p>"
        },
        {
          "id": 15,
          "question": "<p><a name=\"3572\"></a><div itemprop=\"text\"><p>Consider the pushdown automaton (PDA) below which runs over the input alphabet \\( (a, b, c) \\). It has the stack alphabet \\( \\{Z_0, X\\} \\) where \\( Z_0 \\)&nbsp;is the bottom-of-stack marker. The set of states of the PDA is \\( (s, t, u, f\\} \\) where \\( s \\) is the start state and \\( f \\) is the final state. The PDA accepts by final state. The transitions of the PDA given below are depicted in a standard manner. For example, the transition \\( (s, b, X) \\rightarrow&nbsp;(t, XZ_0) \\) means that if the PDA is in state \\( s \\) and the symbol on the top of the stack is \\( X \\), then it can read b from the input and move to state \\( t \\) after popping the top of stack and pushing the symbols \\( Z_0 \\)&nbsp;and \\( X \\) (in that order) on the stack.</p>\n\n<p>\\( (s, a, Z_0) \\rightarrow&nbsp; (s, XXZ_0) \\)<br>\n\\( (s, \\epsilon, Z_0) \\rightarrow&nbsp; (f, \\epsilon) \\)<br>\n\\( (s, a, X) \\rightarrow&nbsp; (s, XXX) \\)<br>\n\\( (s, b, X) \\rightarrow&nbsp; (t, \\epsilon) \\)<br>\n\\( (t, b, X) \\rightarrow&nbsp; (t,\\epsilon) \\)<br>\n\\( (t, c, X) \\rightarrow&nbsp; (u, \\epsilon) \\)<br>\n\\( (u, c, X)&nbsp; \\rightarrow&nbsp; (u, \\epsilon) \\)<br>\n\\( (u, \\epsilon, Z_0) \\rightarrow&nbsp; (f, \\epsilon) \\)</p>\n\n<p>The language accepted by the PDA is</p>\n\n</div><br><br><b>GATE IT 2006 | Question: 33</b></p>",
          "type": "single",
          "options": [
            "<p>\\( \\{a^lb^mc^n \\mid&nbsp;&nbsp;l&nbsp;= m = n\\} \\)</p>",
            "<p>\\( \\{a^l b^m c^n \\mid&nbsp;l&nbsp;= m\\} \\)</p>",
            "<p>\\( \\{a^lb^mc^n \\mid 2l&nbsp;= m + n\\} \\)</p>",
            "<p>\\( \\{a^lb^mc^n \\mid m = n\\} \\)</p>"
          ],
          "correct_answer": "<p>\\( \\{a^lb^mc^n \\mid 2l&nbsp;= m + n\\} \\)</p>",
          "marks": 1,
          "negative_marks": 0.33,
          "explanation": "<p><a href=\"https://gateoverflow.in/3572/gate-it-2006-question-33\" target=\"_blank\">https://gateoverflow.in/3572/gate-it-2006-question-33</a></p>"
        }
      ]
    }
  ]
});
