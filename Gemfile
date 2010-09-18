source "http://rubygems.org"

gem "rails", "3.0.0"
gem "sqlite3-ruby", :require => "sqlite3"

group "development", "test" do
  gem "unicorn"
  gem "rspec", "~> 2.0.0.beta.20"
  gem "rspec-rails", "~> 2.0.0.beta.20"
end

group "test" do
  gem "database_cleaner"
  gem "capybara"
  gem "cucumber-rails", :git => "http://github.com/aslakhellesoy/cucumber-rails.git"
  gem "factory_girl_rails", "1.0", :require => nil
  gem "mocha"
  gem "test-unit"  
end
