require 'spec_helper'

describe "snippets/new.html.erb" do
  before(:each) do
    assign(:snippet, stub_model(Snippet,
      :new_record? => true,
      :title => "MyString",
      :body => "MyText",
      :published => false
    ))
  end

  it "renders new snippet form" do
    render

    rendered.should have_selector("form", :action => snippets_path, :method => "post") do |form|
      form.should have_selector("input#snippet_title", :name => "snippet[title]")
      form.should have_selector("textarea#snippet_body", :name => "snippet[body]")
      form.should have_selector("input#snippet_published", :name => "snippet[published]")
    end
  end
end
