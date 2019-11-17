import React from 'react'

/**
 * @param {Object} props
 * @param {Object} props.departement
 * @param {Object} props.country
 * @param {Number} props.nik
 * @param {String} props.name
 * @param {String} props.barcode
 * @param {String} props.id
 */
export default (props) => {

  return (
    <div id={`card-${props.id}`}>
      <div className='card-list'>
        <div className='card-item__wrapper'>
          <div className='card-item__side -front'>
            <div className='card-item__focus'></div>
            <div className='card-item__cover'>
              <img className='card-item__bg' src='/card-background.png' />
            </div>
            <div className='card-item__wrapper'>
              <div className='card-item__top'>
                {/* <img className='card-item__chip' src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png' /> */}
                {/* <div className='card-item__type'>
                  <img className='card-item__typeImg' src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png' alt />
                </div> */}
              </div>
              {/* <label for='cardNumber' className='card-item__number'></label> */}
              <div className='card-item__content'>
                <label for='cardName' className='card-item__info'>
                  <div className='card-item__holder'>Card Holder</div>
                  <div className='card-item__name'>{props.name}</div>
                  <div className='card-item__departement'>{props.departement ? props.departement.name : null}</div>
                  <div className='card-item__country'>{props.country ? props.country.text : null}</div>
                </label>
                <div class='card-item__date'>
                  <img alt={props.nik} src={props.barcode} style={{ width: '100%', height: 100 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}