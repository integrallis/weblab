require 'spec_helper'

describe "snippets/index.html.erb" do
  before(:each) do
    assign(:snippets, [
      stub_model(Snippet,
        :title => "Title",
        :body => "MyText",
        :published => false
      ),
      stub_model(Snippet,
        :title => "Title",
        :body => "MyText",
        :published => false
      )
    ])
  end

  it "renders a list of snippets" do
    render
    rendered.should have_selector("tr>td", :content => "Title".to_s, :count => 2)
    rendered.should have_selector("tr>td", :content => "MyText".to_s, :count => 2)
    rendered.should have_selector("tr>td", :content => false.to_s, :count => 2)
  end
end
