|%
::
::
+$  mon
  $:
  who=@p   :: id
  pub=@ud  :: public key
  sec=@ud  :: private key
  lif=@ud  :: life
  rif=@ud  :: rift
  sed=@ux  :: precomputed seed
  dat=@da  :: creation date
  tag=(list @tas)  :: TODO list of tags
  ==
+$  action
  $%
    :: print state
    [%show ~]
    [%make-moon ~]
    [%rekey-moon who=@p]
    [%breach-moon who=@p]
    [%forget-moon who=@p]
    [%add-tag who=@p tag=@tas]
    [%del-tag who=@p tag=@tas]
  ==
+$  update
  $%
    [%moons mons=(list mon)]
  ==
--

