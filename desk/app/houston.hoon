/-  *houston
/+  houston
/+  default-agent, dbug, agentio
=,  format
::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  $:
  %0
  :: TODO is it worth making this a map?
  mons=(list mon)
  ==
+$  card     card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
    io    ~(. agentio bowl)
    hc    ~(. +> bowl)
::
++  on-fail   on-fail:def
++  on-leave  on-leave:def
++  on-arvo   on-arvo:def
++  on-save
  ^-  vase
  !>(state)
++  on-init
  ^-  (quip card _this)
  `this
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  `this(state old)
  ==
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path  (on-peek:def path)
    [%x %mons ~]
      ``noun+!>(mons)
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
    ::
    :: :: houston
      %houston-action
    ?.  =(src.bowl our.bowl)
      `this
    =/  act  !<(action vase)
    ?-  -.act
      :: :: ::
          %show
      ~&  >  mons.state
      `this
      :: :: ::
          %make-moon
      =/  mun  (bar-moon:houston bowl ~)
      ?~  mun
        `this
      =/  mon  u.mun
      =.  mons.state
        mon^mons.state
      ::
      :_  this
      :~
        (jael-moon:houston mon)
        (give-mons mons.state)
      ==
          %make-my-moon
      :: TODO this is mostly just duplicated %make-moon
      :: this code should be cleaned up
      :: i just dont wanna deal with parsing a (unit @p) from json
      =/  mon=(unit mon)
        (get-mon:hc who.act mons.state)
      ?.  =(~ mon)  !!
      =/  mun  (bar-moon:houston bowl [~ who.act])
      ?~  mun
        `this
      =/  mon  u.mun
      =.  mons.state
        mon^mons.state
      ::
      :_  this
      :~
        (jael-moon:houston mon)
        (give-mons mons.state)
      ==
      :: :: ::
          %rekey-moon
      :: get mon
      =/  =mon
        (got-mon:hc who.act mons.state)
      :: generate mon
      =.  mon
        (bar-moon-cycle-keys:houston bowl mon)
      :: set mon
      =.  mons.state
        (set-mon mon mons.state)
      ::
      :_  this
        :~
        (jael-moon:houston mon)
        (give-mons mons)
        ==
      :: :: ::
          %breach-moon
      =/  =rift
        (bar-moon-breach:houston bowl who.act)
      =/  =mon
        (got-mon:hc who.act mons.state)
      =.  rif.mon  rift
      =.  mons.state
        (set-mon mon mons.state)
      :: TODO
      ::   this should work, but its hard to verify for the frontend
      ::   depends on some callback from jael?
      ::   or could do a behn timer and then scry to check rift?
      :_  this
        :~
        (jael-moon-breach:houston who.act rift)
        (give-mons mons)
        ==
      :: :: ::
          %forget-moon
      =.  mons.state
        (del-mon who.act mons.state)
      :_  this
        :~
        (give-mons mons)
        ==
      :: :: ::
          %import-moon
      =/  mun=(unit mon)
        (get-mon:hc who.act mons.state)
      ?.  =(~ mun)  !!
      =|  =mon
      =:  who.mon  who.act
          dat.mon  now.bowl
          tag.mon  [%imported ~]
        ==
      =.  mons.state
        [mon mons.state]
      :_  this
        :~
        (give-mons mons)
        ==
      :: :: ::
          %add-tag
      =/  =mon
        (got-mon:hc who.act mons.state)
      =/  fund  (find ~[tag.act] tag.mon)
      ?~  fund
        :: only add tag if doesn't exist already
        =.  tag.mon  (snoc tag.mon tag.act)
        =.  mons.state
          (del-mon who.mon mons.state)
        =.  mons.state
          [mon mons.state]
        :_  this
          :~
          (give-mons mons)
          ==
        ::
      `this
      :: :: ::
          %del-tag
      =/  =mon
        (got-mon:hc who.act mons.state)
      =/  fund  (find ~[tag.act] tag.mon)
      ?~  fund  !!
      =.  tag.mon  (oust [u.fund 1] tag.mon)
      =.  mons.state
        (set-mon mon mons.state)
      :_  this
        :~
        (give-mons mons)
        ==
    ==
  ==
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  `this
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path
    (on-watch:def path)
      [%moons ~]
    :_  this
    :~
      (give-mons mons.state)
    ==
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  del-mon
  |=  [her=@p mons=(list mon)]
  ^-  (list mon)
  ?~  mons  ~
  ?:  =(her who.i.mons)
    $(mons t.mons)
  :-  i.mons
  $(mons t.mons)
++  set-mon
  |=  [her=mon mons=(list mon)]
  ^-  (list mon)
  %+  turn  mons
    |=  =mon
    ?:  =(who.mon who.her)
      her
    mon
++  get-mon
  |=  [who=@p mons=(list mon)]
  ^-  (unit mon)
  |-
  ?~  mons  ~
  ?:  =(who who.i.mons)
    [~ i.mons]
  $(mons t.mons)
++  got-mon
  |=  [who=@p mons=(list mon)]
  =/  mon=(unit mon)
    (get-mon who mons)
  ?~  mon  !!
  u.mon
++  give-mons
  |=  mons=(list mon)
  =/  upd=update  [%moons mons]
  (fact:agentio houston-update+!>(upd) ~[/moons])
-- 

