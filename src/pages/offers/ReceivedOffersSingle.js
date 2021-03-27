import React from 'react'
import withAuthorization from '../../hoc/withAuthorization'
import { IonPage, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from "@ionic/react";
import ServiceItem from '../../components/service/ServiceItem'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/SpinnerComponent'
import { withRouter } from "react-router";
import { firestore } from "../../firebase";
import { fetchReceivedOffers, changeOfferStatus } from '../../actions'

class ReceivedOffers extends React.Component {
  
  componentDidMount() {
    const { auth } = this.props
    this.props.fetchReceivedOffers(auth.user.uid)
  }
  

  acceptOffer = offerId => {
    this.props.changeOfferStatus(offerId, 'accepted')
  }

  declineOffer = offerId => {
    this.props.changeOfferStatus(offerId, 'declined')
  }
  
  render() {
    const { match, location, history } = this.props;
    console.log("match is", match.params.id)
    
      const offerId = match.params.id
      
    firestore.collection('services').doc(offerId).get().then((snapshot) => {
      let offer = snapshot.data();
      offer = JSON.stringify(offer);
      this.setState({ offer : offer }) 
    });
          

    var offer = firestore.collection('services')
      .doc(match.params.id).get()
    console.log("its offer", offer)
    
    const { offers, isFetching } = this.props
    
    if (isFetching) { return <Spinner />}

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Received Offers</IonTitle>
          </IonToolbar>
        </IonHeader>
        { !isFetching && offers.length === 0 &&
          <span className="tag is-warning is-large">You don't have any received offers :(</span>
        }
      <div className="columns">
        { offers.map(offer => (
          <div 
            key={offer.id}
            className="column is-one-third">
            <ServiceItem
              noButton
              className="offer-card"
              service={offer.service}>
                {offer.status}
                <hr />
              <div className="service-offer">
                <div>
                  <span className="label">From User:</span> {offer.fromUser.fullName}
                </div>
                <div>
                  <span className="label">Note:</span> {offer.note}
                </div>
                <div>
                  <span className="label">Time:</span> {offer.time} hours
                </div>
              </div>
              { offer.status === 'pending' &&
                <div>
                  <hr />
                  <button 
                    onClick={() => this.acceptOffer(offer.id)} 
                    className="button is-success s-m-r">Accept</button>
                  <button 
                    onClick={() => this.declineOffer(offer.id)} 
                    className="button is-danger">Decline</button>
                </div>
              }
            </ServiceItem>
          </div>
          ))
        }
      </div>
    </IonPage>
    )
  }
}

const mapStateToProps = ({offers}) => ({ offers: offers.received, isFetching: offers.isFetching })

const mapDispatchToProps = () => ({
  changeOfferStatus,
  fetchReceivedOffers
})

export default  
  withRouter(withAuthorization(
      connect(mapStateToProps, mapDispatchToProps())(ReceivedOffers)))