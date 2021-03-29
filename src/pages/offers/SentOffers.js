import React from 'react';
import { IonPage, IonBackButton, IonItem, IonCardContent, IonCardSubtitle, IonCardHeader, IonList, IonCard, IonHeader, IonTitle, IonButtons, IonToolbar, IonLoading, IonButton, IonContent } from "@ionic/react";
import withAuthorization from '../../hoc/withAuthorization';
import { withToastManager } from 'react-toast-notifications';
import ServiceItem from '../../components/service/ServiceItem';
import { connect } from 'react-redux';
import { newMessage, newCollaboration } from '../../helpers/offers';
import { fetchSentOffers, collaborate } from '../../actions';

class SentOffers extends React.Component {

  componentDidMount() {
    const { auth } = this.props
    this.props.dispatch(fetchSentOffers(auth.user.uid))
  }

  createCollaboration = offer => {
    const { auth: { user }, toastManager} = this.props

    const collaboration = newCollaboration({offer, fromUser: user})
    const message = newMessage({offer, fromUser: user})

    this.props.collaborate({collaboration, message})
      .then(_ => 
        toastManager.add('Collaboration was Created!', {
          appearance: 'success',
          autoDismiss: true })
      )
  } 

  render() {
    const { offers, isFetching } = this.props

    if (isFetching) { return <IonLoading isOpen={isFetching} />}

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Sent Offers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          { !isFetching && offers.length === 0 &&
            <span className="tag is-warning is-large">You don't have any send offers :(</span>
          }
          <IonList>
            { offers.map(offer => (
              <IonItem 
                key={offer.id}
                style={{height: "900px"}}>
                <IonCard>
                  <img src={offer.service.image} />
                  <IonCardHeader>
                    <IonCardSubtitle>{offer.title}</IonCardSubtitle>
                    <IonCardSubtitle>{offer.status}</IonCardSubtitle>
                  </IonCardHeader>
                <IonCardContent>
                  <div className="service-offer">
                    <div>
                      <span className="label">To User:</span> {offer.toUser.fullName}
                    </div>
                    <div>
                      <span className="label">Note:</span> {offer.note}
                    </div>
                    <div>
                      <span className="label">Price:</span> ${offer.price}
                    </div>
                    <div>
                      <span className="label">Time:</span> {offer.time} hours
                    </div>
                  </div>
                  { offer.status === 'accepted' && !offer.collaborationCreated &&
                    <div>
                      <hr />
                      <IonButton 
                        onClick={() => this.createCollaboration(offer)}
                        className="button is-success">Collaborate</IonButton>
                    </div>
                  }
                </IonCardContent>
              </IonCard>
            </IonItem>
              ))
            }
          </IonList>
        </IonContent>
    </IonPage>
    )
  }
}

const mapStateToProps = ({offers}) => ({ offers: offers.sent, isFetching: offers.isFetching })
const SentOffersWithToast = withToastManager(SentOffers)

export default 
  withAuthorization(
    connect(mapStateToProps, {collaborate})(SentOffersWithToast))