class SnippetsController < InheritedResources::Base

  def edit
    @snippet = resource
  end
  
  def create
    Snippet.create!(params[:snippet]) # build_resource
    @snippets = collection
  end
  
  def update
    snippet = Snippet.find(params[:id])
    snippet.update_attributes(params[:snippet])
    render :nothing => true
  end
  
end
