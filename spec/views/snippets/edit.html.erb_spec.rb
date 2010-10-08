require 'spec_helper'

describe "snippets/edit.html.erb" do
  before(:each) do
    @snippet = assign(:snippet, stub_model(Snippet,
      :new_record? => false,
      :title => "MyString",
      :body => "MyText",
      :published => false
    ))
  end

  it "renders the edit snippet form" do
    render

    rendered.should have_selector("form", :action => snippet_path(@snippet), :method => "post") do |form|
      form.should have_selector("input#snippet_title", :name => "snippet[title]")
      form.should have_selector("textarea#snippet_body", :name => "snippet[body]")
      form.should have_selector("input#snippet_published", :name => "snippet[published]")
    end
  end
end
