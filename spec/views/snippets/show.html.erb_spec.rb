require 'spec_helper'

describe "snippets/show.html.erb" do
  before(:each) do
    @snippet = assign(:snippet, stub_model(Snippet,
      :title => "Title",
      :body => "MyText",
      :published => false
    ))
  end

  it "renders attributes in <p>" do
    render
    rendered.should contain("Title".to_s)
    rendered.should contain("MyText".to_s)
    rendered.should contain(false.to_s)
  end
end
