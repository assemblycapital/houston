/-  houston
=,  format
|_  act=action:houston
++  grab
  |%  
  ++  noun  action:houston
  ++  json
    |=  jon=^json
    %-  action:houston
    =<  (action-noun jon)
    |%
    ++  action-noun
      %-  of:dejs
      :~
        [%show ul:dejs]
::        [%make-moon [~ (se:dejs %p)]]  :: TODO optional choice of patp
        [%make-moon ul:dejs]
        [%rekey-moon (se:dejs %p)]
        [%breach-moon (se:dejs %p)]
        [%forget-moon (se:dejs %p)]
        [%add-tag get-who-tag]
        [%del-tag get-who-tag]
      ==
    ++  get-who-tag
      %-  ot:dejs
      :~
        [%who (se:dejs %p)]
        [%tag so:dejs]
      ==
    --
  --  
++  grow
  |%  
  ++  noun  act 
  --  
++  grad  %noun
--

