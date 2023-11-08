import React, { FC } from 'react'
import { IUser } from '../models/IUser'
import { IEvent } from '../models/IEvent'

interface EventFormItemProps {
  guest: IUser,
  event: IEvent,
  setEvent: (event: IEvent) => void
}

const EventFormItem:FC<EventFormItemProps> = ({guest, event, setEvent}) => {
  const handleRemove = () => {
    const filteredGuests = event.guests.filter((item) => item._id !== guest._id);

    setEvent({...event, guests: filteredGuests})
  }

  return (
    <div className='event-form-item-container'>
      <p className='event-form-item'>
        {guest.username}
      </p>

      <button type='button' onClick={handleRemove} className='event-form-item-close-btn'>
        X
      </button>
    </div>
  )
}

export default EventFormItem