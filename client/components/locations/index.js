import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

const DetailLI = styled.div`
    .title {
        
    }
    & p: {
        margin: '0.3em 0';
        font-size: 12px;
    }
`;

const Item = () => (
    <DetailLI style={styles.card}>
        <div className="title">Andrae Michaels Studio - Denver</div>
        <p><b>Nearest Availability:</b>&nbsp;&nbsp;<span>2/22/2019 2:15 PM</span></p>
        <p><b>Address:</b>&nbsp;&nbsp;<span>911 W Anderson Blvd, Suite 203 Austin, TX 78757</span></p>
        <p><b>Phone Number:</b>&nbsp;&nbsp;<span>512.785.9522</span></p>
        <p><b>EMail:</b>&nbsp;&nbsp;<span>studioaustin@andraemichaels.com</span></p>
    </DetailLI>
);

const Locations = (props) => {
    const locations = new Array(20).fill('a');
  return (
    <div style={styles.container}>
        <h1 style={styles.title}>Locations</h1>
        <Grid container spacing={24}>
            {locations.map((color, index) =>
                <Grid item md={3} key={index} >
                    <Item />
                </Grid>
            )}
        </Grid>
    </div>
  )
}

export default Locations;

const styles = {
    container: {
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
    },
    title: {
        fontSize: '2em',
        marginTop: 50,
        marginBottom: 50,
    },
    card: {
        border: '1px solid #eee',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: 0.3,
        padding: 20,
    },
    cardtitle: {
        fontSize: '1.6em',
        fontWeight: 'bold',
        margin: '1em 0 ',
    }
}
