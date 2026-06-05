function ProfileCard({title, user, image}){
    return  <div className = "card" style={{width:100}}>
                <div clasName = "card-image">
                    <img src={image} style={{maxWidth: 100}} alt="pda logo"/>
                </div>
                <div className="media-content">
                    <h3>{title} {user}</h3>
                </div>
            </div>
}

export default ProfileCard;