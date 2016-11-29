Rails.application.routes.draw do
  root 'static_pages/home'

  get '/plotter' => 'static_pages#plotter'

  get '/about' => 'static_pages#about'

end
