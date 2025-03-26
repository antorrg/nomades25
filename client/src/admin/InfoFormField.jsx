import React, { useState } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

const InfoFormField = ({title, info, place, color, action}) => {
    const finalTitle = title? title : null
    const finalInfo = info? info : 'Para que esto funcione encerrar todo en un div con "className="form-group".'
    const finalPlace = place? place : 'right'
    const finalColor = color? color : 'none'
    const finalTrigger = action ? [action, 'focus'] : ['focus', 'click']
  return (

        <>
        <OverlayTrigger
          trigger={finalTrigger}
          placement={finalPlace}
          rootClose
          overlay={
            <Popover id="popover-basic">
              <Popover.Header as="h3">{finalTitle}</Popover.Header>
              <Popover.Body>
                {finalInfo}
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant={finalColor} className="ms-2">
            <h6>?</h6>
          </Button>
        </OverlayTrigger>
        </>
  );
};

export default InfoFormField;
