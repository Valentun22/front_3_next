
const FormAddVenue = () => {
    return(
        <div>
            <form>
                <input type={"text"} name={'name'}/>
                <input type={"text"} name={'image'}/>
                <input type={"text"} name={'location'}/>
                <input type={"text"} name={'averageCheck'}/>
                <input type={"text"} name={'workingHours'}/>
                <input type={"text"} name={'contactInfo'}/>
                <input type={"text"} name={'tags'}/>
                <input type={"text"} name={'description'}/>
                <input type={"text"} name={'menu'}/>
                <input type={"text"} name={'type'}/>
                <input type={"text"} name={'features'}/>
                <input type={"text"} name={'rating'}/>
                <div>
                    <button>Save venue</button>
                </div>
            </form>
        </div>
    );
};
export default FormAddVenue;
