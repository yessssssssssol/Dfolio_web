import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { commentAuthService } from "../services/commentService";

const commentAuthRouter = Router();

commentAuthRouter.post(
  "/comment/register",
  loginRequired,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // req (request) 에서 데이터 가져오기
      const hostId = req.body.hostId;
      const content = req.body.content;
      const authorId = req.currentUserId;

      // 데이터를 댓글 db에 추가하기
      const newComment = await commentAuthService.addComment({
        hostId,
        content,
        authorId,
      });
      console.log(newComment);

      if (newComment.errorMessage) {
        throw new Error(newComment.errorMessage);
      }

      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
);

commentAuthRouter.get("/comments/:id", async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const authorId = req.currentUserId;
    const currentCommentInfo = await commentAuthService.getCommentInfo({
      commentId,
      authorId,
    });

    if (currentCommentInfo.errorMessage) {
      throw new Error(currentCommentInfo.errorMessage);
    }

    res.status(200).send(currentCommentInfo);
  } catch (error) {
    next(error);
  }
});

commentAuthRouter.get("/commentlist/:host", async (req, res, next) => {
  try {
    const hostId = req.params.host;
    const authorId = req.currentUserId;

    // 사용자의 전체 댓글 목록을 가져옴
    const comments = await commentAuthService.getComments({
      hostId,
      authorId,
    });

    if (comments.errorMessage) {
      throw new Error(comments.errorMessage);
    }
    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

commentAuthRouter.put("/comments/:id", async (req, res, next) => {
  try {
    // URI로부터 댓글 id를 추출함.
    const commentId = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const content = req.body.content ?? null;

    const toUpdate = { content };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedComment = await commentAuthService.setComment({
      commentId,
      toUpdate,
    });

    if (updatedComment.errorMessage) {
      throw new Error(updatedComment.errorMessage);
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
});

commentAuthRouter.delete("/comments/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const commentId = req.params.id;
    const userId = req.currentUserId;
    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await commentAuthService.deleteComment({
      commentId,
      userId,
    });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { commentAuthRouter };
