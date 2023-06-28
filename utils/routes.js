function renderHomePage(req, res, status) {
    res.render('index', { status });
    return status;
  }
  
function handleStatusForm(req, res, status) {
    const { body } = req;
  
    // Check if the status is valid
    if (body.status === 'online' || body.status === 'busy') {
      status = body.status;
    }
  
    res.redirect('/');
    return status;
}

  
  
  module.exports = {
    renderHomePage,
    handleStatusForm,
  };
  