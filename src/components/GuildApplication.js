const GuildApplication = () => {
  return (
    <div className='guild-application-container'>
      <p>
        Before submitting an application please check our about section to get
        some general guild information. We always consider applications from
        skilled players regardless of the listed recruitment needs on the home
        page.
      </p>
      <form
        action='https://forms.gle/dgs96rNqXEviSq1t8'
        target='_blank'
        rel='noopener noreferrer'
      >
        <input type='submit' value='Guild Application'></input>
      </form>
    </div>
  );
};

export default GuildApplication;
