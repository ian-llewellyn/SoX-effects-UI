function getEffectList() {
    // Load effects.json
}

function populateEffectList() {
    // For each effect, create a new HTML node
}

function expand_parameter(parameter) {
  if ( parameter.hasOwnProperty('group') && parameter.group == true ) {
    document.write( '<div style="border: solid gray 1px; margin: 5px 0; padding: 5px">' )
    parameter.parameters.forEach(expand_parameter)
    document.write( '</div>' )
  } else {
    document.write( '<input type="text" placeholder="' + parameter.title +
      '" title="' + parameter.help + '"' +
      ( parameter.mandatory ? ' style="border-color: #faa"' : '' ) +
      '/>' )
  }
}

function build_ui() {
  xhr = new XMLHttpRequest()
  xhr.open('GET', 'effects.json', true)
  function ol(e) {
    if ( this.status == 200 ) {
      effects = JSON.parse( this.responseText )
      effects.forEach( function(effect) {
        document.write( '<h2>' + effect.title + '</h2>' )
        document.write( '<p>' + effect.description + '</p>' )
        effect.parameters.forEach( expand_parameter )
      } )
    }
  }

  xhr.onload = ol
  xhr.send()
}

window.onload = build_ui
