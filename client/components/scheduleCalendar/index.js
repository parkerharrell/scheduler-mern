import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from './events';
import * as moment from 'moment';
import styled from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Modal from 'react-awesome-modal';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const localizer = BigCalendar.momentLocalizer(moment);
class Selectable extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { 
      events,
      eventList: [],
      appointmentDate: null,
      visible: false,
    };

  }

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
    this.setState({
        visible : false,
        eventList: [],
    });
  }

  confirmModal() {
    this.setState({
      visible: false,
    });
  }

  handleSelect = ({ start, end }) => {
    const { events } = this.state;
    if (events.filter(event => moment(event.start).format('YYYY-MM-DD hh:mm a') === moment(start).format('YYYY-MM-DD hh:mm a')).length > 0) {
      return false;
    }
    const title = '';
    this.setState({
      eventList: [
        ...this.state.eventList,
        {
          start,
          end,
          title,
        },
      ],
    });
    setTimeout(() => {
      this.setState({ visible: true });
    }, 500);
  }

  dateSelected = (date) => {
    this.setState({ appointmentDate: moment(date).toDate() });
  }
  
  customSlotPropGetter = date => {
    const { events } = this.state;
    const slotTime = moment(date).format('YYYY-MM-DD hh:mm a');
    if (events.filter(event => moment(event.start).format('YYYY-MM-DD hh:mm a') === slotTime).length > 0)
      {return {
        className: 'unavailable',
      };}
    else {return { className: 'available', };}
  };

  render() {
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 57);
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);

    const { appointmentDate, eventList } = this.state;

    return (
      <React.Fragment>
        <div style={{ display: 'flex' }}>
          <div>
            <InfiniteCalendar
              width={400}
              height={550}
              selected={appointmentDate}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={[
                new Date(2019, 2, 28),
                new Date(2019, 3, 5),
                new Date(2019, 3, 4),
                new Date(2019, 3, 15),
                new Date(2019, 3, 16),
                new Date(2019, 3, 17),
                new Date(2019, 3, 12)
              ]}
              onSelect={this.dateSelected}
            />
          </div>
          <Container>
            <BigCalendar
              selectable
              localizer={localizer}
              step={15}
              key={appointmentDate}
              events={eventList}
              slotPropGetter={this.customSlotPropGetter}
              defaultDate={appointmentDate}
              onSelectEvent={() => {}}
              onSelectSlot={this.handleSelect}
              defaultView={BigCalendar.Views.DAY}
              views={{ day: true }}
              components={{
                event: Event,
              }}
            />
          </Container>
        </div>
        <Modal visible={this.state.visible} width="400" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div style={{ padding: 20 }}>
              <Grid container alignItems="flex-end">
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                  <CloseIcon onClick={() => this.closeModal()} />
                </Grid>
                <br/>
                <Grid item xs={12} style={{ fontSize: '1.4em', fontWeight: 500, padding: '20px 0' }}>
                  Do you really want to add this event? 
                </Grid>
                <br/>
                <Grid item xs={12} style={{ textAlign: 'right', paddingTop: 20 }}>
                  <Button variant="contained" color="primary" onClick={() => this.confirmModal()} >
                    Yes
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="contained" color="secondary" onClick={() => this.closeModal()} >
                     No
                  </Button>
                </Grid>
              </Grid>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  );
}

const Container = styled.div`
  flex: 1 1;
  padding-left: 30px;
  min-height: 400px;
  max-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
`;

export default Selectable;