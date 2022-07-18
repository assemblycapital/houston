/-  houston
=,  format
|_  upd=update:houston
++  grab
  |%  
  ++  noun  update:houston
  --
++  grow
  |%  
  ++  noun  upd
  ++  json
    ?-  -.upd
    %moons
      %+  frond:enjs
      %moons
      :-  %a
      %+  turn  mons.upd
        mon-to-json
    ==
  ++  mon-to-json
    |=  =mon:houston
    %-  pairs:enjs
    :~  
        ['who' [%s (scot %p who.mon)]]
        ['pub' [%s (scot %ud pub.mon)]]
        ['sec' [%s (scot %ud sec.mon)]]
        ['lif' [%s (scot %ud lif.mon)]]
        ['rif' [%s (scot %ud rif.mon)]]
        ['sed' [%s (scot %uw sed.mon)]]
        ['dat' (sect:enjs dat.mon)]
        :-  'tag'  :-  %a
          %+  turn  tag.mon
            tag-to-json
    ==
  ++  tag-to-json
    |=  tag=@tas
    [%s tag]
  --  
++  grad  %noun
--


