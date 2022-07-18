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
  tag=(list @tas)  :: list of custom tags
  ==
+$  action
  $%
    :: print state
    [%show ~]
    [%make-moon ~]
    [%make-my-moon who=@p]
    [%rekey-moon who=@p]
    [%breach-moon who=@p]
    [%forget-moon who=@p]
    [%import-moon who=@p]
    [%add-tag who=@p tag=@tas]
    [%del-tag who=@p tag=@tas]
  ==
+$  update
  $%
    [%moons mons=(list mon)]
  ==
--

