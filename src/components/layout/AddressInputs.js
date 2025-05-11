
export default function AddresInputs({addressProps, setAddressProp, disabled=false}){

    const {phone, streetAddress, postalCode, city, country} = addressProps;

    return(
        <>
        <label>Telefonszám</label>
        <input
          disabled={disabled}
          type="tel"
          placeholder="Telefonszám"
          value={phone || ''}
          onChange={(ev) => setAddressProp('phone', ev.target.value)}/>
        <label>Utca/házszám</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Utca/házszám"
          value={streetAddress || ''}
          onChange={(ev) => setAddressProp('streetAddress', ev.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label>Város</label>
            <input
              disabled={disabled}
              type="text"
              placeholder="Város"
              value={city || ''}
              onChange={(ev) => setAddressProp('city', ev.target.value)}
            />
          </div>
          <div>
            <label>Irányitószám</label>
            <input
              disabled={disabled}
              type="text"
              placeholder="Irányitószám"
              value={postalCode || ''}
              onChange={(ev) => setAddressProp('postalCode', ev.target.value)}
            />
          </div>
        </div>
        <label>Ország</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Ország"
          value={country || ''}
          onChange={(ev) => setAddressProp('country', ev.target.value)}/>
        </>
    );
}