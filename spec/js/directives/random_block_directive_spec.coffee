describe 'random block directive', ->
  beforeEach ->
    module('crossroads')

  beforeEach inject(($compile) ->
    @element = $compile('<div class="random-block"><div></div><div></div></div>')({})
  )

  it 'hides one random child element', ->
    expect(@element.find("div.hidden").length).toEqual(1)
