package model.selector;

public class AbstractBaseSelector {
  
  private int limit;
	private int page;

  public Integer getOffset(){
    if(this.hasPagination()){
      return this.limit * (this.page - 1);
    }
    return null;
  }

  public int getLimit() {
		return limit;
	}
	
	public void setLimit(int limit) {
		this.limit = limit;
	}
	
	public int getPage() {
		return page;
	}
	
	public void setPage(int page) {
		this.page = page;
	}
  
  public boolean hasPagination(){
    return this.limit > 0 && this.page > 0;
  }


}
